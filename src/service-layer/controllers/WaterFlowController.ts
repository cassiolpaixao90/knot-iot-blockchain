import { Controller, Get, JsonController, Post, Put, Param, Delete, Body, OnUndefined, UseBefore, Req, Res } from 'routing-controllers';
import { validateWaterFlowRequest } from '../../business-layer/validator/WaterFlowValidationProcessor';
import { IWaterFlowCreateRequest } from '../request/IWaterFlowRequest';
import { logger } from '../../middleware/common/Logging';
import { WaterFlowDataAgent } from '../../data-layer/data-agents/WaterFlowDataAgent';
import { IWaterFlowResponse } from '../responses/IWaterFlowResponse';
import { WaterFlowModel } from '../../data-layer/models/WaterFlowModel';
import { MyMiddleware } from '../../middleware/middleware/custom-middleware/MyMiddleWare';
import { Request } from 'express-serve-static-core';

@JsonController('/waterflow')
@UseBefore(MyMiddleware)
export class WaterFlowController {

    private waterFlowDataAgent: WaterFlowDataAgent;
    constructor() {
        this.waterFlowDataAgent = new WaterFlowDataAgent();
    }
    /*
     API 1: get all listing
    */
    @Get('/waterflow-listing')
    async getWaterFlowList(): Promise<any> {
        return { "msg": "This is first Typescript Microservice" };
    }

    /*
    API 2: Get watter by waterFlowID
    */
    @Get('/waterFlow-by-id/:waterFlowId')
    @OnUndefined(404)
    async getWaterFlowById(@Param("waterFlowId") waterFlowId: number): Promise<any> {
        return { "msg": "This is first Typescript Microservice" };
    }

    /*
    API 3: Add update waterFlow.
    */
    @Put('/add-update-waterflow')
    async addUpdateWaterFlow(@Body() request: IWaterFlowCreateRequest, @Req() req: any, @Res() res: any): Promise<any> {
        let validationErrors: any[] = await validateWaterFlowRequest(request);
        logger.info("total Validation Errors for newWaterFlow:-", validationErrors.length);
        if (validationErrors.length > 0) {
            throw {
                thrown: true,
                status: 401,
                message: 'Incorrect Input',
                data: validationErrors
            }
        }
        let result = await this.waterFlowDataAgent.createNewWaterFlow(request);
        if (result.id) {
            let newWaterFlow = new WaterFlowModel(result);
            let newWaterFlowResult = Object.assign({ newWaterFlow: newWaterFlow.getClientWaterFlowModel() });
            return res.json(<IWaterFlowResponse>(newWaterFlowResult));
        } else {
            throw result;
        }
    }

    /*
    API 4: find product by waterFlow type.
    */
    @Get('/waterflow-by-type/:waterFlowType')
    async getWaterFlowByType(@Param("waterFlowType") waterFlowType: string): Promise<any> {
        return { "msg": "This is first Typescript Microservice" };
    }

    /*
    API 5: Delete product by waterFlowId
    */
    @Delete('/waterflow/:waterFlowId')
    @OnUndefined(404)
    async deleteWaterFlow(@Param("waterFlowId") waterFlowId: number): Promise<any> {
        console.log(waterFlowId);
        return { "msg": "This is first Typescript Microservice" };
    }
}

