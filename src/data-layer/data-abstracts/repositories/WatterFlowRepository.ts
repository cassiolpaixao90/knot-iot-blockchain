
import { Model, model } from "mongoose";
import { MongooseAccess } from "../../adapters/MongoAccess";
import { IWaterFlowDocument } from "./IWaterFlowDocument";
import { WaterFlowSchema } from "./WaterFlowSchema";

export type WaterFlowMod = Model<IWaterFlowDocument>;

export const WaterFlowRepo: WaterFlowMod = MongooseAccess.mongooseConnection.model<IWaterFlowDocument>("waterflow", WaterFlowSchema);

