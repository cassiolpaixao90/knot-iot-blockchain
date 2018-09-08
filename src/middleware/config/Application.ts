import { logger } from '../common/Logging'
import { ExpressConfig } from './Express';
import settings from '../../../settings/environment/Index'

export class Application {

  server: any;
  express: ExpressConfig;

  constructor() {
    this.express = new ExpressConfig();

    const { port } = settings.server;

    this.server = this.express.app.listen(port, () => {
      logger.info(`
      --------------------------------------------------
       Server Started! Express: http://localhost:${port}
       Health : http://localhost:${port}/ping
      ------------------------------------------------------
      `)
    });
  }

}