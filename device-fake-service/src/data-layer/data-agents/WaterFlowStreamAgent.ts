import WaterflowPub from "../../middleware/common/WaterflowPub";

export class WaterFlowDataAgent {
  private waterflowPub: WaterflowPub;
  private waterFlow: any;

  constructor() {
    this.waterflowPub = new WaterflowPub();
  }

  async createNewWaterFlow(data: any) {
    this.waterFlow = {
      uuid: data.uuid,
      flowRate: data.message.flowRate,
      anamolia: data.anamolia
    };
    this.waterflowPub.publish(this.waterFlow);
  }
}
