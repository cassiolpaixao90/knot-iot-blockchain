import { logger } from "../../middleware/common/Logging";
import { WaterFlowUtils } from "../../middleware/common/Utils";
const request = require("request");
export class WaterFlowDataAgent {
  private waterFlowUtils: WaterFlowUtils;

  constructor() {
    this.waterFlowUtils = new WaterFlowUtils();
  }

  async createNewWaterFlow(data: any): Promise<any> {
    const liters = data.flowRate / 60;
    const cost = this.waterFlowUtils.calculateCost(liters);
    logger.info("UUID:", "Total; (L):", liters, "Cost:", cost);
    const dateTime = new Date().getTime();
    const timestamp = Math.floor(dateTime / 1000);
    const dataT = {
      userNumber:
        "dc099880ee7d2b16e956b33cbd8b71d7cf5fdb85a3d14aea434572936a0afbd7",
      candidateNumber: "11",
      ellectionName: "iot do bixao",
      address: `${timestamp}${Math.random()}`
    };

    request.post(
      {
        headers: { "content-type": "application/json" },
        url: "http://localhost:9005/api/register/",
        form: dataT
      },
      function(error, response, body) {
        // console.log("body", body);
        // console.log("response", response);
        console.log("error", error);
      }
    );
  }
}
