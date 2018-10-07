import {Eureka} from 'eureka-js-client';

export class EurekaService {

  private static _client: Eureka;

  constructor() {
  }

  static builder(): Eureka {
    if (!this._client) {
      this._client = new Eureka(
        {
          instance: {
            instanceId: 'device-fake-service',
            app: 'device-fake-service',
            hostName: 'localhost',
            ipAddr: '127.0.0.1',
            statusPageUrl: `http://localhost:${9090}`,
            healthCheckUrl: `http://localhost:${9090}/health`,
            port: {
              '$': 9090,
              '@enabled': true,
            },
            vipAddress: 'device-fake-service',
            dataCenterInfo: {
              '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
              'name': 'MyOwn',
            },
          },
          eureka: {
            host: 'localhost',
            port: 8761,
            servicePath: '/eureka/apps/',
          }
        });
    }
    return this._client;
  }
}

