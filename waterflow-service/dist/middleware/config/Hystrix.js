"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Brakes = require("brakes");
const http = require("http");
/**
 * Add Hystrix configuration to the app server
 */
// tslint:disable:no-console
exports.configHystrix = () => {
    const globalStats = Brakes.getGlobalStats();
    http
        .createServer((req, res) => {
        res.setHeader('Content-Type', 'text/event-stream;charset=UTF-8');
        res.setHeader('Cache-Control', 'no-cache, no-store, max-age=0, must-revalidate');
        res.setHeader('Pragma', 'no-cache');
        globalStats.getHystrixStream().pipe(res);
    })
        .listen(3001, () => {
        console.log('---------------------');
        console.log('Hystrix Stream now live at localhost:3001/hystrix.stream');
        console.log('---------------------');
    });
};
//# sourceMappingURL=Hystrix.js.map