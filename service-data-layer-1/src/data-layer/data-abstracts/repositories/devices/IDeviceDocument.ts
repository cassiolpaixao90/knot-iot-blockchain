import mongoose = require("mongoose");

export interface IDeviceDocument extends mongoose.Document {
  name: string;
  owner: string;
  anamolia: boolean;
}
