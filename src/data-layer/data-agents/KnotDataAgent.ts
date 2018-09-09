'use strict';

import moment from 'moment-timezone';
import { IDeviceDocument, DeviceMod, IWaterFlowDocument, WaterFlowRepo } from "../data-abstracts/repositories/index";
import * as mongoose from 'mongoose';
import { logger } from '../../middleware/common/Logging';
import { DeviceRepo } from '../data-abstracts/repositories/devices/DeviceRepository';
import { CostUtils } from '../../middleware/common/Utils';

export class KnotAccess {

    private url: string;
    private uuid: string;
    private token: string;
    private io: any;
    private sockets: any;
    private socket: any;
    private waterFlow: any;
    private costUtils: CostUtils;

    constructor(uuid, token, io) {
        this.url = `${process.env.KNOT_HOST}:${process.env.KNOT_PORT}`;
        this.uuid = uuid;
        this.token = token;
        this.io = io;
        this.sockets = {};
        this.costUtils = new CostUtils();
    }

    start() {
        this.socket = require('socket.io-client')(this.url);
        this._addEventHandlers();
    }

    addSocket(user, id) {
        this.sockets[user] = id;
    }

    removeSocket(user) {
        if (this.sockets[user]) {
            delete this.sockets[user];
        }
    }

    _onConnect() {
        this.socket.emit('identity', {
            uuid: this.uuid,
            token: this.token
        });
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
        const cost = this.costUtils.calculateCost(liters);
        logger.info('UUID:', uuid, 'Total (L):', liters, 'Cost:', cost);
        if (device && this.sockets[device.owner]) {
            this.io.sockets.connected[this.sockets[device.owner]].emit('message', { device: uuid, flowRate, liters, cost });
        }
    }

    _addEventHandlers() {
        this.socket.on('connect', this._onConnect.bind(this));
        this.socket.on('message', this._onMessage.bind(this));
        this.socket.on('ready', () => logger.info('Smart Hydrometer Client has started'));
        this.socket.on('disconnect', () => logger.info('Smart Hydrometer Client has disconnected...'));
    }
}
