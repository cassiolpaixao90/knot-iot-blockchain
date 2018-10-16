"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helmet = require("helmet");
const csrf = require("csurf");
/**
 * Add Security Settings for the Express App
 * @param app Express App
 */
exports.secureApp = (app) => {
    console.log("configuration of security app");
    app.use(helmet());
    app.use(csrf({ cookie: true }));
    app.use((req, res, next) => {
        res.cookie('XSRF-TOKEN', req.csrfToken());
        next();
    });
};
//# sourceMappingURL=Security.js.map