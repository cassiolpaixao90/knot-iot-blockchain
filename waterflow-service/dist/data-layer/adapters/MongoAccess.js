"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Mongoose = require("mongoose");
const config = require("config");
const Logging_1 = require("../../middleware/common/Logging");
Mongoose.Promise = global.Promise;
class MongooseAccess {
    constructor() {
        MongooseAccess.connect();
    }
    static connect() {
        if (this.mongooseInstance) {
            return this.mongooseInstance;
        }
        let connectionString = config.get('mongo.urlClient').toString();
        this.mongooseConnection = Mongoose.connection;
        this.mongooseConnection.once('open', () => {
            Logging_1.logger.info('Connect to an mongodb is opened.');
        });
        this.mongooseInstance = Mongoose.connect(connectionString);
        this.mongooseConnection.on('connected', () => {
            Logging_1.logger.info('Mongoose default connection open to ' + connectionString);
        });
        /**
         * @description If the connection throws an error
         */
        this.mongooseConnection.on('error', (msg) => {
            Logging_1.logger.info('Mongoose default connection message:', msg);
        });
        /**
          @description When the connection is disconnected
         */
        this.mongooseConnection.on('disconnected', () => {
            setTimeout(function () {
                this.mongooseInstance = Mongoose.connect(connectionString);
            }, 10000);
            Logging_1.logger.info('Mongoose default connection disconnected.');
        });
        /**
         * @description When the connection is reconnected
         */
        this.mongooseConnection.on('reconnected', () => {
            Logging_1.logger.info('Mongoose default connection is reconnected.');
        });
        /**
         * @description If the Node process ends, close the Mongoose connection
         */
        process.on('SIGINT', () => {
            this.mongooseConnection.close(() => {
                Logging_1.logger.info('Mongoose default connection disconnected through app termination.');
                process.exit(0);
            });
        });
        return this.mongooseInstance;
    }
}
exports.MongooseAccess = MongooseAccess;
MongooseAccess.connect();
//# sourceMappingURL=MongoAccess.js.map