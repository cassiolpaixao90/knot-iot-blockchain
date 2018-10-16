import { logger } from "../../middleware/common/Logging";
import { WaterFlowUtils } from "../../middleware/common/Utils";
export class WaterFlowDataAgent {

  private waterFlowUtils: WaterFlowUtils;

  constructor() {
    this.waterFlowUtils = new WaterFlowUtils();
  }

  async createNewWaterFlow(data: any): Promise<any> {
    const liters = data.flowRate / 60;
    const cost = this.waterFlowUtils.calculateCost(liters);
    logger.info("UUID:", "Total (L):", liters, "Cost:", cost);
  }
}
