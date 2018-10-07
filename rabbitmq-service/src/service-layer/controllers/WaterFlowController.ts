import {
  Controller,
  Get,
  JsonController,
  Post,
  Put,
  Param,
  Delete,
  Body,
  OnUndefined,
  UseBefore,
  Req,
  Res
} from "routing-controllers";
import { validateWaterFlowRequest } from "../../business-layer/validator/WaterFlowValidationProcessor";
import { IWaterFlowCreateRequest } from "../request/IWaterFlowRequest";
import { logger } from "../../middleware/common/Logging";

import { IWaterFlowResponse } from "../responses/IWaterFlowResponse";
import { WaterFlowModel } from "../../data-layer/models/WaterFlowModel";
import { MyMiddleware } from "../../middleware/custom-middleware/MyMiddleWare";
import { Request } from "express-serve-static-core";
import * as fetch from "node-fetch";
import * as wrapFetch from "zipkin-instrumentation-fetch";
import { tracer } from "../../middleware/config/ZipkinConfig";
import { WokerStreamDataAgent } from "data-layer/data-agents/WorkerStreamDataAgent";
// import {  KnotAccess } from '../../data-layer/adapters/KnotAccess'

@JsonController("/waterflow")
@UseBefore(MyMiddleware)
export class WaterFlowController {
  private workerStreamDataAgent: WokerStreamDataAgent;

  constructor() {
    this.workerStreamDataAgent = new WokerStreamDataAgent();
  }

  /**
   * @param {IWaterFlowCreateRequest} request
   * @param {*} req
   * @param {*} res
   * @returns {Promise<any>}
   * @memberof WaterFlowController
   */
  @Post("/add")
  async addWaterFlow(
    @Body() request: IWaterFlowCreateRequest,
    @Req() req: any,
    @Res() res: any
  ): Promise<any> {
    /**
     * @description valid fields request
     */
    let validationErrors: any[] = await validateWaterFlowRequest(request);
    logger.info(
      "total Validation Errors for newWaterFlow:-",
      validationErrors.length
    );

    if (validationErrors.length > 0) {
      throw {
        thrown: true,
        status: 401,
        message: validationErrors
      };
    }

    await this.workerStreamDataAgent.publish(request);
  }
}
