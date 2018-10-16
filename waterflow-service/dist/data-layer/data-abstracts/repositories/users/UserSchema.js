"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
/**
 * MongooseSchema
 * @type {"mongoose".Schema}
 * @private
 */
let UserSchema = new mongoose_1.Schema({
    _id: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});
exports.UserSchema = UserSchema;
//# sourceMappingURL=UserSchema.js.map