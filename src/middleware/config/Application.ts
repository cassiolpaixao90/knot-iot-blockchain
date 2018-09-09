import { logger } from '../common/Logging'
import { ExpressConfig } from './Express';
import * as config from 'config';
import { KnotAccess } from '../../data-layer/data-agents/KnotDataAgent'
import { KnotModel } from '../../data-layer/models/KnotModel'
import { start } from './Knot';

export class Application {

  server: any;
  express: ExpressConfig;

  knotAccess: KnotAccess;
  knotModel: KnotModel;
  

  constructor() {
    this.express = new ExpressConfig();
    
    const http = require("http").Server(this.express.app);
    const io = require('socket.io')(http);

    
    const { server, porta, uuid, token } = config.get('meshblu')
    const url = `${server}:${porta}`
    this.knotAccess = new KnotAccess(uuid, token, io, url);


    const port = config.get('express.port');
    const debugPort = config.get('express.debug');
    
    start();

    this.server = http.listen(port, () => {
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