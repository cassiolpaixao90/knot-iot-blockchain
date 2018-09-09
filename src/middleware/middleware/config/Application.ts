import { logger } from '../common/Logging'
import { ExpressConfig } from './Express';
import * as config from 'config';
import { KnotAccess } from '../../../data-layer/data-agents/KnotDataAgent'
import { KnotModel } from '../../../data-layer/models/KnotModel'

export class Application {

  server: any;
  express: ExpressConfig;
  knotAccess: KnotAccess;
  knotModel: KnotModel;

  constructor() {

    this.express = new ExpressConfig();

    const io = require('socket.io')(this.express.app);

    console.log("opa");
    
    const url = `${this.knotModel.server}:${this.knotModel.port}`
    this.knotAccess = new KnotAccess(this.knotModel.uuid, this.knotModel.token, io, url);

    const port = config.get('express.port');
    const debugPort = config.get('express.debug');

    logger.info('Starting KNoT cloud client...');
    this.knotAccess.start();

    this.server = this.express.app.listen(port, () => {
      logger.info(`
      --------------------------------------------------
      Server Started! Express: http://localhost:${port}
      ------------------------------------------------------
      `)
    });

  }

}