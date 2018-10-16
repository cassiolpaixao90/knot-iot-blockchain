"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @description  here we will have getters and setters of waterFlowModel
 */
class WaterFlowModel {
    constructor(iWaterFlowDocument) {
        this._waterFlowModel = iWaterFlowDocument;
    }
    get uuid() {
        return (this._waterFlowModel.uuid).toString();
    }
    get flowRate() {
        return this._waterFlowModel.flowRate;
    }
    getClientWaterFlowModel() {
        return Object.seal({
            uuid: (this._waterFlowModel.uuid).toString(),
            flowRate: (this._waterFlowModel.flowRate).toString()
        });
    }
}
exports.WaterFlowModel = WaterFlowModel;
//# sourceMappingURL=WaterFlowModel.js.map