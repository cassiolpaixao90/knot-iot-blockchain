const amqp = require('amqplib/callback_api')

class DeviceWorker {
  constructor () {
    this.url = 'amqp://guest:guest@localhost'
    this.amqpConn = null
    this.pubChannel = null
    this.offlinePubQueue = []
    this.exchange = 'my-delay-exchange'
    this.init()
  }

  init () {
    amqp.connect(
      this.url,
      (err, conn) => {
        if (err) {
          console.error('[AMQP]', err.message)
          return setTimeout(this.start(), 1000)
        }

        conn.on('error', err => {
          if (err.message !== 'Connection closing') {
            console.error('[AMQP] conn error', err.message)
          }
        })

        conn.on('close', () => {
          console.error('[AMQP] conn error', err.message)
          console.error('[AMQP - CLOSE] reconnecting')
          return setTimeout(this.start(), 1000)
        })

        console.log('[AMQP] connected')
        this.amqpConn = conn
        this.whenConnected()
      }
    )
  }

  whenConnected () {
    this.startPublisher()
    this.startWorker()
  }

  startPublisher () {
    this.amqpConn.createConfirmChannel((err, ch) => {
      if (this.closeOnErr(err)) return
      ch.on('error', err => {
        console.error('[AMQP] channel error', err.message)
      })
      ch.on('close', () => {
        console.log('[AMQP] channel closed')
      })
      this.pubChannel = ch
      this.pubChannel.assertExchange(this.exchange, 'x-delayed-message', {
        autoDelete: false,
        durable: true,
        passive: true,
        arguments: { 'x-delayed-type': 'direct' }
      })

      this.pubChannel.bindQueue('jobs', this.exchange, 'jobs')

      while (true) {
        const m = this.offlinePubQueue.shift()
        if (!m) break
        this.publish(m[0], m[1], m[2])
      }
    })
  }

  // A worker that acks messages only if processed succesfully
  startWorker () {
    this.amqpConn.createChannel((err, ch) => {
      if (this.closeOnErr(err)) return
      ch.on('error', err => {
        console.error('[AMQP] channel error', err.message)
      })
      ch.on('close', () => {
        console.log('[AMQP] channel closed')
      })

      ch.prefetch(10)
      ch.assertQueue('jobs', { durable: true }, (err, _ok) => {
        if (this.closeOnErr(err)) return
        console.info('Worker is started')
      })
    })
  }

  publish (routingKey, content, delay) {
    try {
      this.pubChannel.publish(
        this.exchange,
        routingKey,
        content,
        { headers: { 'x-delay': delay } },
        (err, ok) => {
          if (err) {
            console.error('[AMQP] publish', err)
            this.offlinePubQueue.push([this.exchange, routingKey, content])
            this.pubChannel.connection.close()
          }
        }
      )
    } catch (e) {
      console.error('[AMQP] failed', e.message)
      this.offlinePubQueue.push([routingKey, content, delay])
    }
  }

  closeOnErr (err) {
    if (!err) return false
    this.amqpConn.close()
    return true
  }
}

module.exports = new DeviceWorker()
