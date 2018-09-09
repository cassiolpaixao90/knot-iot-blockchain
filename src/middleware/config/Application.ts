import { logger } from '../common/Logging'
import { ExpressConfig } from './Express';
import * as config from 'config';
import { KnotAccess } from '../../data-layer/data-agents/KnotDataAgent'
import { KnotModel } from '../../data-layer/models/KnotModel'
// import { start } from './Knot';
import * as spdy from 'spdy';
import * as path from 'path';
import * as fs from 'fs';

export class Application {

  server: any;
  express: ExpressConfig;

  knotAccess: KnotAccess;
  knotModel: KnotModel;


  constructor() {
    this.express = new ExpressConfig();

    const certsPath = path.resolve('certs');
    const options = {
      key: fs.readFileSync(certsPath + "/server.key"),
      cert: fs.readFileSync(certsPath + "/server.crt")
    }


    const http = require("http").Server(this.express.app);
    const io = require('socket.io')(http);


    const { server, porta, uuid, token } = config.get('meshblu')
    const url = `${server}:${porta}`
    this.knotAccess = new KnotAccess(uuid, token, io, url);


    const port = config.get('express.port');
    const debugPort = config.get('express.debug');

    // start();

    this.server = spdy.createServer(options, this.express.app)
      .listen(port, (error: any) => {
        
        if (error) {
          logger.error("failed to start server with ssl", error);
          return process.exit(1);
        }
        logger.info(`
      --------------------------------------------------
      Server Started! Express: http://localhost:${port}
      Health : http://localhost:${port}/ping
      Starting KNoT cloud client...
      ------------------------------------------------------
      `)
        this.knotAccess.start();
      });
  }

}