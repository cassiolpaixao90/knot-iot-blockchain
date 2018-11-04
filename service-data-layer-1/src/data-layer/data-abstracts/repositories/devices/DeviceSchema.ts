import { Schema } from "mongoose";

/**
 * MongooseSchema
 * @type {"mongoose".Schema}
 * @private
 */
let DeviceSchema: Schema = new Schema({
  name: {
    type: String,
    required: true
  },
  owner: {
    type: String,
    required: false
  },
  anomalia: {
    type: Boolean
  }
});

export { DeviceSchema };
