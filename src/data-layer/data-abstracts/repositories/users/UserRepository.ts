
import { Model, model } from "mongoose";
import { MongooseAccess } from "../../../adapters/MongoAccess";
import { IUserDocument } from "./IUserDocument";
import { UserSchema } from "./UserSchema";

export type UserMod = Model<IUserDocument>;

export const UserRepo: UserMod = MongooseAccess.mongooseConnection.model<IUserDocument>("user", UserSchema);
 

