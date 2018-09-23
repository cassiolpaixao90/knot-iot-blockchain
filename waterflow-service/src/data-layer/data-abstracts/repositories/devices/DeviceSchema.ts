import { Schema } from "mongoose"; 

/**
 * MongooseSchema
 * @type {"mongoose".Schema}
 * @private
 */
let DeviceSchema: Schema = new Schema({
    _id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    owner: {
        type: String,
        required: true,
        ref: 'User',
        index: true
    }
})
 
export { DeviceSchema };