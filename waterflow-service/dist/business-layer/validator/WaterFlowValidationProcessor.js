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
const class_validator_1 = require("class-validator");
const WaterFlowValidationSchema_1 = require("./WaterFlowValidationSchema");
const lodash_1 = require("lodash");
function validateWaterFlowRequest(waterFlowReqObj) {
    return __awaiter(this, void 0, void 0, function* () {
        let validProductData = new WaterFlowValidationSchema_1.WaterFlowValidationSchema(waterFlowReqObj);
        let validationResults = yield class_validator_1.validate(validProductData);
        let constraints = [];
        if (validationResults && validationResults.length > 0) {
            lodash_1.forEach(validationResults, (item) => {
                constraints.push(lodash_1.pick(item, 'constraints', 'property'));
            });
        }
        return constraints;
    });
}
exports.validateWaterFlowRequest = validateWaterFlowRequest;
//# sourceMappingURL=WaterFlowValidationProcessor.js.map