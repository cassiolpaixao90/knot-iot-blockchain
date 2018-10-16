"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MongoAccess_1 = require("../../../adapters/MongoAccess");
const DeviceSchema_1 = require("./DeviceSchema");
exports.DeviceRepo = MongoAccess_1.MongooseAccess.mongooseConnection.model("device", DeviceSchema_1.DeviceSchema);
//# sourceMappingURL=DeviceRepository.js.map