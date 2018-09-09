import * as express from 'express';
import * as helmet from 'helmet';
import * as csrf from 'csurf';

/**
 * Add Security Settings for the Express App
 * @param app Express App
 */
export const secureApp = (app: express.Application) => {

    app.use(helmet());
    app.use(csrf({ cookie: true }));
    app.use((req: any, res, next) => {
        res.cookie('XSRF-TOKEN', req.csrfToken());
        next();
    });
};
