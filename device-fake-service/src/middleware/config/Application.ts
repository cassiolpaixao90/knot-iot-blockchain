import {logger} from '../common/Logging'
import {ExpressConfig} from './Express';
import * as config from 'config';
import * as spdy from 'spdy';
import * as path from 'path';
import * as fs from 'fs';
// import {KnotSocket} from './Socket'

export class Application {

  server: any;
  express: ExpressConfig;
  // knotSocket: KnotSocket;

  constructor() {
    this.express = new ExpressConfig();

    const certsPath = path.resolve('certs');
    const options = {
      key: fs.readFileSync(certsPath + "/server.key"),
      cert: fs.readFileSync(certsPath + "/server.crt")
    };

    const port = config.get('express.port');

    this.server = spdy.createServer(options, this.express.app)
      .listen(port, (error: any) => {

        if (error) {
          logger.error("failed to start server with ssl", error);
          return process.exit(1);
        }
        logger.info(`
      --------------------------------------------------
      Server Started! Express: http://localhost:${port}
      Starting KNoT cloud client...
      ------------------------------------------------------
      `)
      });

    // new KnotSocket();
  }

}
