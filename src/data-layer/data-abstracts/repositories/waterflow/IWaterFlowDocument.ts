import mongoose = require('mongoose');

export interface IWaterFlowDocument extends mongoose.Document {
    uuid: string,
    flowRate: string
}