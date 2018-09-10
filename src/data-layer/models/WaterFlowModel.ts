import { IWaterFlowDocument } from "../data-abstracts/repositories/index";

/**
 * @description  here we will have getters and setters of waterFlowModel
 */

export class WaterFlowModel {
    private _waterFlowModel: IWaterFlowDocument;

    constructor(iWaterFlowDocument: IWaterFlowDocument) {
        this._waterFlowModel = iWaterFlowDocument;
    }

    get uuid(): string {
        return (this._waterFlowModel.uuid).toString();
    }

    get flowRate(): string {
        return this._waterFlowModel.flowRate;
    }


    getClientWaterFlowModel() {
        return Object.seal({
            uuid: (this._waterFlowModel.uuid).toString(),
            flowRate: (this._waterFlowModel.flowRate).toString()
             
        })
    }
}