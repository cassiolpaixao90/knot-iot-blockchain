import * as moment from "moment-timezone";
import {
  IDeviceDocument,
  DeviceRepo,
  IWaterFlowDocument,
  WaterFlowRepo
} from "../data-abstracts/repositories/index";
import * as mongoose from "mongoose";
import { logger } from "../../middleware/common/Logging";
import { WaterFlowUtils } from "../../middleware/common/Utils";
export class WaterFlowDataAgent {
  private waterFlowUtils: WaterFlowUtils;
  private waterFlow: any;
  public setdate = moment();

  constructor() {
    this.waterFlowUtils = new WaterFlowUtils();
  }

  async createNewWaterFlow(data: any): Promise<any> {
    let newWaterFlow = <IWaterFlowDocument>data;
    await WaterFlowRepo.create({ uuid: data.uuid, flowRate: data.flowRate });
    // const [total] = await WaterFlowRepo.aggregate([
    //   {
    //     $project: {
    //       flowRate: "$flowRate",
    //       uuid: "$uuid",
    //       month: { $month: "$timestamp" }
    //     }
    //   },
    //   { $match: { month: this.setdate.month() + 1 } },
    //   { $group: { _id: null, flowRate: { $sum: "$flowRate" } } }
    // ]);

    // const liters = total.flowRate / 60;
    // const cost = this.waterFlowUtils.calculateCost(liters);
    // logger.info("UUID:", "Total (L):", liters, "Cost:", cost);
  }
}
