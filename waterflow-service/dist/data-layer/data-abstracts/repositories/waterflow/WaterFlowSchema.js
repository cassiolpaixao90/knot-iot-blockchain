"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
/**
 * MongooseSchema
 * @type {"mongoose".Schema}
 * @private
 */
let WaterFlowSchema = new mongoose_1.Schema({
    flowRate: {
        type: String,
        required: true,
        unique: false
    },
    uuid: {
        type: String,
        required: true,
        ref: 'Device'
    }
});
exports.WaterFlowSchema = WaterFlowSchema;
//# sourceMappingURL=WaterFlowSchema.js.map