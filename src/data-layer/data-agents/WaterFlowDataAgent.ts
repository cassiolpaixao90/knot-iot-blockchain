import { IWaterFlowDocument } from "../data-abstracts/repositories/index";
import { WaterFlowRepo } from "../data-abstracts/repositories/waterflow/WatterFlowRepository";
import * as mongoose from 'mongoose';

export class WaterFlowDataAgent {
    constructor() { }

    async createNewWaterFlow(waterFlow: any): Promise<any> {
        let newWaterFlow = <IWaterFlowDocument>(waterFlow);
        if (newWaterFlow.id) {
            let waterFlowObj = await WaterFlowRepo.findOne({ waterFlowId: newWaterFlow.id });
            if (waterFlowObj && waterFlowObj.ownerId != newWaterFlow.ownerId) {
                return { thrown: true, success: false, status: 403, message: "you are not the owner of WaterFlow" }
            }
        }
        let addUpdateWaterFlow = await WaterFlowRepo.create(newWaterFlow);
        console.log(addUpdateWaterFlow);
        if (addUpdateWaterFlow.errors) {
            return { thrown: true, success: false, status: 422, message: "db is currently unable to process request" }
        }
        return addUpdateWaterFlow;
    }

    async getAllWaterFlows(): Promise<any> {

    }

    async getWaterFlowById(waterFlowId: string): Promise<any> {
        let objectId = mongoose.Types.ObjectId;
        if (!objectId.isValid(waterFlowId)) {
            return { status: 401, message: "incorrect waterFlow id" }
        }
        let result = await WaterFlowRepo.findById(waterFlowId);
        if (result.errors) {
            return { thrown: true, success: false, status: 422, message: "db is currently unable to process request" }
        }
        return result;
    }

}