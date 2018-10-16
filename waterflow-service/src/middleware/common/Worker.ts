import * as Amqp from "amqp-ts";

// tslint:disable:no-console
export const subscribe = (data: any) => {
  const _connection = new Amqp.Connection("amqp://guest:guest@localhost");
  const exchange = _connection.declareExchange("waterflow-exchange");
  var queue = _connection.declareQueue("waterflow-queues");
  queue.bind(exchange);
  _connection.completeConfiguration().then(() => {
    var message = new Amqp.Message(new Buffer(JSON.stringify(data)));
    exchange.send(message);
  });
};
