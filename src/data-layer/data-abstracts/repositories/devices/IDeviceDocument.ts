import mongoose = require('mongoose');

export interface IDeviceDocument extends mongoose.Document {
    id: string,
    name: string,
    owner: string
}