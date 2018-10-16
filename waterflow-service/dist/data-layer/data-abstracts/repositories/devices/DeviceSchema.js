"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
/**
 * MongooseSchema
 * @type {"mongoose".Schema}
 * @private
 */
let DeviceSchema = new mongoose_1.Schema({
    _id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    owner: {
        type: String,
        required: true,
        ref: 'User',
        index: true
    }
});
exports.DeviceSchema = DeviceSchema;
//# sourceMappingURL=DeviceSchema.js.map