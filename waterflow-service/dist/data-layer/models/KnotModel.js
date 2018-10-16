"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = require("config");
class KnotModel {
    constructor() {
        this._server = config.get('meshblu.server');
        this._port = config.get('meshblu.port');
        this._uuid = config.get('meshblu.uuid');
        this._token = config.get('meshblu.token');
    }
    get server() {
        return this._server.toString();
    }
    get port() {
        return this._port.toString();
    }
    get uuid() {
        return this._uuid.toString();
    }
    get token() {
        return this._token.toString();
    }
}
exports.KnotModel = KnotModel;
//# sourceMappingURL=KnotModel.js.map