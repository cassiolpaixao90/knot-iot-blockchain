
import { Model, model } from "mongoose";
import { MongooseAccess } from "../../../adapters/MongoAccess";
import { IDeviceDocument } from "./IDeviceDocument";
import { DeviceSchema } from "./DeviceSchema";

export type DeviceMod = Model<IDeviceDocument>;

export const DeviceRepo: DeviceMod = MongooseAccess.mongooseConnection.model<IDeviceDocument>("device", DeviceSchema);
 

