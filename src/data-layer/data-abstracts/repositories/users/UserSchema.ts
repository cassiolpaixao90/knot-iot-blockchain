import { Schema } from "mongoose";

/**
 * MongooseSchema
 * @type {"mongoose".Schema}
 * @private
 */
let UserSchema: Schema = new Schema({
    _id: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

export { UserSchema };