"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const routing_controllers_1 = require("routing-controllers");
const path = require("path");
const health = require("express-ping");
const helmet = require("helmet");
const typedi_1 = require("typedi");
const ZipkinConfig_1 = require("../../middleware/config/ZipkinConfig");
const zipkin_instrumentation_express_1 = require("zipkin-instrumentation-express");
const Hystrix_1 = require("./Hystrix");
class ExpressConfig {
    constructor() {
        this.app = express();
        // secureApp(this.app);
        this.app.use(cors());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json());
        this.app.use(cookieParser());
        this.app.use(health.ping());
        this.app.use(helmet());
        this.app.use(this.clientErrorHandler);
        this.setUpControllers();
        this.setupZipkinServer();
        Hystrix_1.configHystrix();
    }
    setUpControllers() {
        const controllersPath = path.resolve('dist', 'service-layer/controllers');
        routing_controllers_1.useContainer(typedi_1.Container);
        routing_controllers_1.useExpressServer(this.app, {
            controllers: [controllersPath + "/*.js"],
            cors: true
        });
    }
    clientErrorHandler(err, req, res, next) {
        if (err.hasOwnProperty('thrown')) {
            res.status(err["status"]).send({ error: err.message });
        }
    }
    setupZipkinServer() {
        this.app.use(zipkin_instrumentation_express_1.expressMiddleware({ tracer: ZipkinConfig_1.tracer, serviceName: 'waterflow-service' }));
    }
}
exports.ExpressConfig = ExpressConfig;
//# sourceMappingURL=Express.js.map