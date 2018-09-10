'use strict';

import moment from 'moment-timezone';
import { IDeviceDocument, DeviceMod, IWaterFlowDocument, WaterFlowRepo } from "../data-abstracts/repositories/index";
import * as mongoose from 'mongoose';
import { logger } from '../../middleware/common/Logging';
import { DeviceRepo } from '../data-abstracts/repositories/devices/DeviceRepository';
import { WaterFlowUtils } from '../../middleware/common/Utils';

export class KnotAccess {

    private url: string;
    private uuid: string;
    private token: string;
    private io: any;
    private sockets: any;
    private socket: any;
    private waterFlow: any;
    private waterFlowUtils: WaterFlowUtils;

    constructor() {
        this.waterFlowUtils = new WaterFlowUtils();
    }

    async _onMessage(data) {

        this.waterFlow = {
            uuid: data.fromUuid,
            flowRate: data.message.flowRate
        }

        const uuid = this.waterFlow.uuid;
        const flowRate = this.waterFlow.flowRate;
       
        let newWaterFlow = <IWaterFlowDocument>(this.waterFlow);
        let addWaterFlow = await WaterFlowRepo.create(newWaterFlow);
        const [total] = await WaterFlowRepo.aggregate([
            {
                $project: {
                    flowRate: '$flowRate',
                    uuid: '$uuid',
                    month: { $month: '$timestamp' }
                }
            },
            { $match: { uuid, month: moment().month() + 1 } },
            { $group: { _id: null, flowRate: { $sum: '$flowRate' } } }
        ])

        const device = await DeviceRepo.findById(uuid).lean();
        const liters = total.flowRate / 60;
        const cost = this.waterFlowUtils.calculateCost(liters);
        logger.info('UUID:', uuid, 'Total (L):', liters, 'Cost:', cost);
        if (device && this.sockets[device.owner]) {
            this.io.sockets.connected[this.sockets[device.owner]].emit('message', { device: uuid, flowRate, liters, cost });
        }
    }

 
    async createNewWaterFlow(data: any): Promise<void> {

        this.waterFlow = {
            uuid: data.fromUuid,
            flowRate: data.message.flowRate
        }

        const uuid = this.waterFlow.uuid;
        const flowRate = this.waterFlow.flowRate;
            
        let newWaterFlow = <IWaterFlowDocument>(this.waterFlow);
        let addWaterFlow = await WaterFlowRepo.create(newWaterFlow);
        const [total] = await WaterFlowRepo.aggregate([
            {
                $project: {
                    flowRate: '$flowRate',
                    uuid: '$uuid',
                    month: { $month: '$timestamp' }
                }
            },
            { $match: { uuid, month: moment().month() + 1 } },
            { $group: { _id: null, flowRate: { $sum: '$flowRate' } } }
        ])

        const liters = total.flowRate / 60;
        const cost = this.waterFlowUtils.calculateCost(liters);
        logger.info('UUID:', uuid, 'Total (L):', liters, 'Cost:', cost);
    }

    async getAllWaterFlows(): Promise<any> {

    }

    async getWaterFlowById(waterFlowId: string): Promise<any> {
        let objectId = mongoose.Types.ObjectId;
        if (!objectId.isValid(waterFlowId)) {
            return { status: 401, message: "incorrect waterFlow id" }
        }
        let result = await WaterFlowRepo.findById(waterFlowId);
        if (result.errors) {
            return { thrown: true, success: false, status: 422, message: "db is currently unable to process request" }
        }
        return result;
    }
}
