import { Schema } from "mongoose";
import { MongooseAccess } from "../../../adapters/MongoAccess";
import { IWaterFlowDocument } from "./IWaterFlowDocument";

/**
 * MongooseSchema
 * @type {"mongoose".Schema}
 * @private
 */
let WaterFlowSchema: Schema = new Schema({
    flowRate: {
        type: String,
        required: true,
        unique: false
    },
    uuid: {
        type: String,
        required: true,
        ref: 'Device'
    }
});
 

export { WaterFlowSchema };