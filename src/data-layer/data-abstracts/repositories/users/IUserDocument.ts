import mongoose = require('mongoose');

export interface IUserDocument extends mongoose.Document {
    id: string,
    password: string
}