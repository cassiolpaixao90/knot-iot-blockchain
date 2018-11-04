const amqp = require('amqplib/callback_api');

class DeviceWorker {
  constructor() {
    this.url = 'amqp://guest:guest@localhost';
    this.amqpConn = null;
    this.pubChannel = null;
    this.offlinePubQueue = [];
    this.exchange = 'my-delay-exchange';
    this.start();
  }

  start() {
    amqp.connect(
      this.url,
      (err, conn) => {
        conn.on('error', err => {
          if (err.message !== 'Connection closing') {
            console.log("'[AMQP - ERROR] reconnecting'", err);

            // if (this.closeOnErr(err)) return this.start();
          }
        });

        conn.on('close', () => {
          console.error('[AMQP - CLOSE] reconnecting');
          // return this.start();
        });

        console.log('[AMQP] connected');
        this.amqpConn = conn;
        this.whenConnected();
      }
    );
  }

  whenConnected() {
    this.startPublisher();
    this.startWorker();
  }

  startPublisher() {
    this.amqpConn.createConfirmChannel((err, ch) => {
      // if (this.this.closeOnErr(err)) return;
      ch.on('error', err => {
        console.error('[AMQP] channel error', err.message);
      });
      ch.on('close', () => {
        console.log('[AMQP] channel closed');
      });
      this.pubChannel = ch;
      // assert the exchange: 'my-delay-exchange' to be a x-delayed-message,
      this.pubChannel.assertExchange(this.exchange, 'x-delayed-message', {
        autoDelete: false,
        durable: true,
        passive: true,
        arguments: { 'x-delayed-type': 'direct' }
      });
      // Bind the queue: "jobs" to the exchnage: "my-delay-exchange" with the binding key "jobs"
      this.pubChannel.bindQueue('jobs', this.exchange, 'jobs');

      while (true) {
        const m = this.offlinePubQueue.shift();
        if (!m) break;
        publish(m[0], m[1], m[2]);
      }
    });
  }

  // A worker that acks messages only if processed succesfully
  startWorker() {
    this.amqpConn.createChannel((err, ch) => {
      if (this.closeOnErr(err)) return;
      ch.on('error', err => {
        console.error('[AMQP] channel error', err.message);
      });
      ch.on('close', () => {
        console.log('[AMQP] channel closed');
      });

      ch.prefetch(10);
      ch.assertQueue('jobs', { durable: true }, (err, _ok) => {
        if (this.closeOnErr(err)) return;
        // ch.consume('jobs', this.processMsg(), { noAck: false });
        console.info('Worker is started');
      });
    });
  }

  processMsg(msg) {
    this.work(msg, ok => {
      try {
        if (ok) ch.ack(msg);
        else ch.reject(msg, true);
      } catch (e) {
        this.this.closeOnErr(e);
      }
    });
  }

  work(msg, cb) {
    console.log(`${msg.content.toString()} --- received: ${msg}`);
    cb(true);
  }

  publish(routingKey, content, delay) {
    console.log('routingKey', routingKey);
    console.log('content', content);
    console.log('delay', delay);
    try {
      this.pubChannel.publish(
        this.exchange,
        routingKey,
        content,
        { headers: { 'x-delay': delay } },
        (err, ok) => {
          if (err) {
            console.error('[AMQP] publish', err);
            this.offlinePubQueue.push([this.exchange, routingKey, content]);
            this.pubChannel.connection.close();
          }
        }
      );
    } catch (e) {
      console.error('[AMQP] failed', e.message);
      this.offlinePubQueue.push([routingKey, content, delay]);
    }
  }

  closeOnErr(err) {
    if (!err) return false;
    this.amqpConn.close();
    return true;
  }
}

module.exports = new DeviceWorker();
