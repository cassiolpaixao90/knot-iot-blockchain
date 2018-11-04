import * as Amqp from "amqp-ts";

export default class WaterflowPub {
  private _connection: any;

  publish(waterflow) {
    console.log("waterflow", waterflow);
    this._connection = new Amqp.Connection("amqp://guest:guest@localhost");
    const exchange = this._connection.declareExchange("waterflow-exchange");
    var queue = this._connection.declareQueue("waterflow-queues");
    queue.bind(exchange);
    this._connection.completeConfiguration().then(() => {
      var message = new Amqp.Message(new Buffer(JSON.stringify(waterflow)));
      exchange.send(message);
    });
  }
}
