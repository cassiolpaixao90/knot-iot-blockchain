import { Schema } from "mongoose";

/**
 * MongooseSchema
 * @type {"mongoose".Schema}
 * @private
 */
let WaterFlowSchema: Schema = new Schema({
  flowRate: {
    type: String,
    required: false,
    unique: false
  },
  uuid: {
    type: String,
    required: false
  }
});

export { WaterFlowSchema };
