"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MongoAccess_1 = require("../../../adapters/MongoAccess");
const UserSchema_1 = require("./UserSchema");
exports.UserRepo = MongoAccess_1.MongooseAccess.mongooseConnection.model("user", UserSchema_1.UserSchema);
//# sourceMappingURL=UserRepository.js.map