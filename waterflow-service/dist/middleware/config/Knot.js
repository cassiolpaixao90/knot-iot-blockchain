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
const KNoTCloud = require('knot-cloud');
const cloud = new KNoTCloud('knot-test.cesar.org.br', 3000, 'fdf6cbee-1a70-4099-8285-1e300a8a0000', '1c698e0cb986d279855ff7653428fe83c8b39cac');
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield cloud.connect();
            const devices = yield cloud.getDevices();
            console.log("devices", devices);
        }
        catch (err) {
            console.error(err);
        }
        yield cloud.close();
    });
}
exports.start = start;
//# sourceMappingURL=Knot.js.map