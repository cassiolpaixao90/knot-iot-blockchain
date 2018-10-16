"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_timezone_1 = require("moment-timezone");
const index_1 = require("../data-abstracts/repositories/index");
const mongoose = require("mongoose");
const Logging_1 = require("../../middleware/common/Logging");
const Utils_1 = require("../../middleware/common/Utils");
class WaterFlowDataAgent {
    constructor() {
        this.moments = moment_timezone_1.default;
        this.waterFlowUtils = new Utils_1.WaterFlowUtils();
    }
    createNewWaterFlow(data) {
        return __awaiter(this, void 0, void 0, function* () {
            this.waterFlow = {
                uuid: data.fromUuid,
                flowRate: data.message.flowRate
            };
            const uuid = this.waterFlow.uuid;
            const flowRate = this.waterFlow.flowRate;
            let newWaterFlow = (this.waterFlow);
            console.log("newWaterFlow", newWaterFlow);
            let addWaterFlow = yield index_1.WaterFlowRepo.create(newWaterFlow);
            const [total] = yield index_1.WaterFlowRepo.aggregate([
                {
                    $project: {
                        flowRate: '$flowRate',
                        uuid: '$uuid',
                        month: { $month: '$timestamp' }
                    }
                },
                { $match: { uuid, month: this.moments().month() + 1 } },
                { $group: { _id: null, flowRate: { $sum: '$flowRate' } } }
            ]);
            const liters = total.flowRate / 60;
            const cost = this.waterFlowUtils.calculateCost(liters);
            Logging_1.logger.info('UUID:', uuid, 'Total (L):', liters, 'Cost:', cost);
        });
    }
    getAllWaterFlows() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    getWaterFlowById(waterFlowId) {
        return __awaiter(this, void 0, void 0, function* () {
            let objectId = mongoose.Types.ObjectId;
            if (!objectId.isValid(waterFlowId)) {
                return { status: 401, message: "incorrect waterFlow id" };
            }
            let result = yield index_1.WaterFlowRepo.findById(waterFlowId);
            if (result.errors) {
                return { thrown: true, success: false, status: 422, message: "db is currently unable to process request" };
            }
            return result;
        });
    }
}
exports.WaterFlowDataAgent = WaterFlowDataAgent;
//# sourceMappingURL=WaterFlowDataAgent.js.map