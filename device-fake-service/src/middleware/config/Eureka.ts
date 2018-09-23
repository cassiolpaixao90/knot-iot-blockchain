import { Eureka } from 'eureka-js-client';

export class EurekaBuilder {

  constructor(){
      let eureka = new Eureka(
        {
          instance: {
            instanceId: 'hello-world-chapter-6',
            app: 'hello-world-chapter-6',
            hostName: 'localhost',
            ipAddr: '127.0.0.1',
            statusPageUrl: `http://localhost:${9090}`,
            healthCheckUrl: `http://localhost:${9090}/health`,
            port: {
              '$': 9090,
              '@enabled': true,
            },
            vipAddress: 'hello-world-chapter-6',
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

        eureka.start();
  }

 
}
