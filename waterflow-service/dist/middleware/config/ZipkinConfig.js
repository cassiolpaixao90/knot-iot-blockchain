"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zipkin_1 = require("zipkin");
const zipkin_2 = require("zipkin");
const zipkin_transport_http_1 = require("zipkin-transport-http");
const CLSContext = require('zipkin-context-cls');
exports.ctxImpl = new CLSContext('typescript-microservices');
const logRecorder = new zipkin_2.BatchRecorder({
    logger: new zipkin_transport_http_1.HttpLogger({
        endpoint: `http://localhost:9411/api/v1/spans`
    })
});
exports.tracer = new zipkin_1.Tracer({ ctxImpl: exports.ctxImpl, recorder: logRecorder });
//# sourceMappingURL=ZipkinConfig.js.map