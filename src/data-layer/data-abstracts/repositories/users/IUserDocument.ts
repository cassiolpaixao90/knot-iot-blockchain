import mongoose = require('mongoose');

export interface IUserDocument extends mongoose.Document {
    uuid: string,
    password: string
}