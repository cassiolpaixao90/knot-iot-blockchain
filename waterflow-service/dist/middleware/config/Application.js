"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Logging_1 = require("../common/Logging");
const Express_1 = require("./Express");
const config = require("config");
// import { start } from './Knot';
const spdy = require("spdy");
const path = require("path");
const fs = require("fs");
const Socket_1 = require("./Socket");
class Application {
    constructor() {
        this.express = new Express_1.ExpressConfig();
        const certsPath = path.resolve('certs');
        const options = {
            key: fs.readFileSync(certsPath + "/server.key"),
            cert: fs.readFileSync(certsPath + "/server.crt")
        };
        const port = config.get('express.port');
        const debugPort = config.get('express.debug');
        this.server = spdy.createServer(options, this.express.app)
            .listen(port, (error) => {
            if (error) {
                Logging_1.logger.error("failed to start server with ssl", error);
                return process.exit(1);
            }
            Logging_1.logger.info(`
      --------------------------------------------------
      Server Started! Express: http://localhost:${port}
      Health : http://localhost:${port}/ping
      Starting KNoT cloud client...
      ------------------------------------------------------
      `);
            // this.knotAccess.start();
        });
        new Socket_1.KnotSocket();
    }
}
exports.Application = Application;
//# sourceMappingURL=Application.js.map