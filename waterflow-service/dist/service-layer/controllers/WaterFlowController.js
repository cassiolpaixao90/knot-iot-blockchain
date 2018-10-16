"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const routing_controllers_1 = require("routing-controllers");
const WaterFlowValidationProcessor_1 = require("../../business-layer/validator/WaterFlowValidationProcessor");
const Logging_1 = require("../../middleware/common/Logging");
const WaterFlowDataAgent_1 = require("../../data-layer/data-agents/WaterFlowDataAgent");
const MyMiddleWare_1 = require("../../middleware/custom-middleware/MyMiddleWare");
const fetch = require("node-fetch");
const wrapFetch = require("zipkin-instrumentation-fetch");
const ZipkinConfig_1 = require("../../middleware/config/ZipkinConfig");
// import {  KnotAccess } from '../../data-layer/adapters/KnotAccess'
let WaterFlowController = class WaterFlowController {
    // private knotAccess: KnotAccess;
    constructor() {
        this.waterFlowDataAgent = new WaterFlowDataAgent_1.WaterFlowDataAgent();
        this.zipkinFetch = wrapFetch(fetch, {
            tracer: ZipkinConfig_1.tracer,
            serviceName: 'waterflow-service'
        });
        // this.knotAccess = KnotAccess.getInstance();
    }
    /*
     API 1: get all listing
    */
    //    iotRouter.post('/register', iotController.register);
    //    iotRouter.get('/search/:address', iotController.search);
    //    @Post('/register')
    //    async register
    getWaterFlowList() {
        return __awaiter(this, void 0, void 0, function* () {
            let userRes = yield this.zipkinFetch('http://localhost:3000/users/user-by-id/parthghiya');
            console.log("user-res", userRes.text());
            return { "msg": "This is first Typescript Microservice" };
        });
    }
    /*
    API 2: Get watter by waterFlowID
    */
    getWaterFlowById(waterFlowId) {
        return __awaiter(this, void 0, void 0, function* () {
            return { "msg": "This is first Typescript Microservice" };
        });
    }
    /*
    API 3: Add update waterFlow.
    */
    addUpdateWaterFlow(request, req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let validationErrors = yield WaterFlowValidationProcessor_1.validateWaterFlowRequest(request);
            Logging_1.logger.info("total Validation Errors for newWaterFlow:-", validationErrors.length);
            if (validationErrors.length > 0) {
                throw {
                    thrown: true,
                    status: 401,
                    message: 'Incorrect Input',
                    data: validationErrors
                };
            }
            // let result = await this.waterFlowDataAgent.createNewWaterFlow(request);
            // if (result.id) {
            //     let newWaterFlow = new WaterFlowModel(result);
            //     let newWaterFlowResult = Object.assign({ newWaterFlow: newWaterFlow.getClientWaterFlowModel() });
            //     return res.json(<IWaterFlowResponse>(newWaterFlowResult));
            // } else {
            //     throw result;
            // }
        });
    }
    /*
    API 4: find product by waterFlow type.
    */
    getWaterFlowByType(waterFlowType) {
        return __awaiter(this, void 0, void 0, function* () {
            return { "msg": "This is first Typescript Microservice" };
        });
    }
    /*
    API 5: Delete product by waterFlowId
    */
    deleteWaterFlow(waterFlowId) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(waterFlowId);
            return { "msg": "This is first Typescript Microservice" };
        });
    }
};
__decorate([
    routing_controllers_1.Get('/waterflow-listing'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], WaterFlowController.prototype, "getWaterFlowList", null);
__decorate([
    routing_controllers_1.Get('/waterFlow-by-id/:waterFlowId'),
    routing_controllers_1.OnUndefined(404),
    __param(0, routing_controllers_1.Param("waterFlowId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], WaterFlowController.prototype, "getWaterFlowById", null);
__decorate([
    routing_controllers_1.Put('/add-update-waterflow'),
    __param(0, routing_controllers_1.Body()), __param(1, routing_controllers_1.Req()), __param(2, routing_controllers_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], WaterFlowController.prototype, "addUpdateWaterFlow", null);
__decorate([
    routing_controllers_1.Get('/waterflow-by-type/:waterFlowType'),
    __param(0, routing_controllers_1.Param("waterFlowType")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], WaterFlowController.prototype, "getWaterFlowByType", null);
__decorate([
    routing_controllers_1.Delete('/waterflow/:waterFlowId'),
    routing_controllers_1.OnUndefined(404),
    __param(0, routing_controllers_1.Param("waterFlowId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], WaterFlowController.prototype, "deleteWaterFlow", null);
WaterFlowController = __decorate([
    routing_controllers_1.JsonController('/waterflow'),
    routing_controllers_1.UseBefore(MyMiddleWare_1.MyMiddleware),
    __metadata("design:paramtypes", [])
], WaterFlowController);
exports.WaterFlowController = WaterFlowController;
//# sourceMappingURL=WaterFlowController.js.map