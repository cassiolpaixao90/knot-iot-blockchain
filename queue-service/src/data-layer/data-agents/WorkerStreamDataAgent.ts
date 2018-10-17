import WaterflowPub from "middleware/common/WaterflowPub";
import * as Amqp from "amqp-ts";

export class WokerStreamDataAgent {
  private _connection: any;

  constructor() {
    if (!this._connection) {
      this._connection = new Amqp.Connection("amqp://guest:guest@localhost");
    }
  }
  /**
   * @param {*} data
   * @memberof WokerStreamDataAgent
   */
  async publish(data: any) {
    // this._connection = new Amqp.Connection("amqp://guest:guest@localhost");
    const exchange = this._connection.declareExchange("waterflow-exchange");
    var queue = this._connection.declareQueue("waterflow-queues");
    queue.bind(exchange);
    this._connection.completeConfiguration().then(() => {
      var message = new Amqp.Message(new Buffer(JSON.stringify(data)));
      exchange.send(message);
    });
  }
  /**
   * @param {*} data
   * @memberof WokerStreamDataAgent
   */
  async subscribe(data: any) {
    // this._connection = new Amqp.Connection("amqp://guest:guest@localhost");
    const exchange = this._connection.declareExchange("waterflow-exchange");
    var queue = this._connection.declareQueue("waterflow-queues");
    queue.bind(exchange);
    this._connection.completeConfiguration().then(() => {
      var message = new Amqp.Message(new Buffer(JSON.stringify(data)));
      exchange.send(message);
    });
  }
}
