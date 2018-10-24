import * as Amqp from "amqp-ts";
import { WaterFlowDataAgent } from "../../data-layer/data-agents/WaterFlowDataAgent";
export class WorkerWaterFlow {
  private waterFlowDataAgent: WaterFlowDataAgent;
  constructor() {
    this.waterFlowDataAgent = new WaterFlowDataAgent();
  }

  async subscribe(): Promise<any> {
    const _connection = new Amqp.Connection("amqp://guest:guest@localhost");
    const exchange = _connection.declareExchange("waterflow-exchange");
    var queue = _connection.declareQueue("waterflow-queues");
    queue.bind(exchange);
    queue.activateConsumer(message => {
      const data = JSON.parse(message.getContent());
      this.waterFlowDataAgent.createNewWaterFlow(data);
    });

    // this.waterFlowDataAgent.createNewWaterFlow("data");
  }
}

// export const subscribe = () => {
//   const _connection = new Amqp.Connection("amqp://guest:guest@localhost");
//   const exchange = _connection.declareExchange("waterflow-exchange");
//   var queue = _connection.declareQueue("waterflow-queues");
//   queue.bind(exchange);
//   queue.activateConsumer(message => {
//     console.log("Message received: " + message.getContent());
//   });
// };
