import * as express from 'express';
import {Request, Response} from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import { EurekaBuilder } from './Eureka';



export class ExpressConfig {
  app: express.Express;
  eurekaBuilder: EurekaBuilder;
  constructor() {
    this.app = express();
    // secureApp(this.app);
    this.app.use(cors());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json());
    this.app.use(cookieParser());
    this.app.use(this.clientErrorHandler);
    new EurekaBuilder(); 

  }

  clientErrorHandler(err: any, req: Request, res: Response, next: Function): void {
    if (err.hasOwnProperty('thrown')) {
      res.status(err["status"]).send({ error: err.message });
    }
  }


}
