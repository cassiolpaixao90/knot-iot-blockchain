const amqp = require('amqplib/callback_api');
const service = require('./service');

class DeviceWorker {
  constructor() {
    this.url = 'amqp://guest:guest@localhost';
    this.amqpConn = null;
    this.pubChannel = null;
    this.exchange = 'my-delay-exchange';
    this.init();
  }

  init() {
    amqp.connect(
      this.url,
      (err, conn) => {
        if (err) {
          console.error('[AMQP]', err.message);
          return setTimeout(this.start(), 1000);
        }

        conn.on('error', err => {
          if (err.message !== 'Connection closing') {
            console.error('[AMQP] conn error', err.message);
          }
        });

        conn.on('close', () => {
          console.error('[AMQP] conn error', err.message);
          console.error('[AMQP - CLOSE] reconnecting');
          return setTimeout(this.start(), 1000);
        });

        console.log('[AMQP] connected');
        this.amqpConn = conn;
        this.subscribe();
      }
    );
  }

  // A worker that acks messages only if processed succesfully
  subscribe() {
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
        ch.consume('jobs', processMsg, { noAck: false });
        console.info('subscribe is started');
      });

      function processMsg(msg) {
        work(msg, ok => {
          try {
            if (ok) ch.ack(msg);
            else ch.reject(msg, true);
          } catch (e) {
            this.closeOnErr(e);
          }
        });
      }

      function work(msg, cb) {
        const data = JSON.parse(msg.content.toString());
        service.sendDataBlockchain(data);
        cb(true);
      }
    });
  }

  closeOnErr(err) {
    if (!err) return false;
    this.amqpConn.close();
    return true;
  }
}

module.exports = new DeviceWorker();
