"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MongoAccess_1 = require("../../../adapters/MongoAccess");
const WaterFlowSchema_1 = require("./WaterFlowSchema");
exports.WaterFlowRepo = MongoAccess_1.MongooseAccess.mongooseConnection.model("waterflow", WaterFlowSchema_1.WaterFlowSchema);
//# sourceMappingURL=WatterFlowRepository.js.map