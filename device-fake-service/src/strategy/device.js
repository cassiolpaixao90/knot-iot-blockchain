const deviceUtil = require('../utils/device-utils');
const deviceWorker = require('../workers/worker');

class DeviceStrategy {
  static water() {
    setInterval(() => {
      const flowRate = new String(deviceUtil.randomInRange(66.12345, 125.99999));
      const data = {
        uuid: 'fdf6cbee-1a70-4099-8285-1e300a8a0000',
        cost: flowRate.valueOf(),
        anamolia: '0'
      };
      deviceWorker.publish('jobs', new Buffer(JSON.stringify(data)), 1000);
    }, 1000);
  }

  static anomalia() {
    setInterval(() => {
      const data = {
        uuid: 'fdf6cbee-1a70-4099-8285-1e300a8a0000',
        cost: '',
        anamolia: '1'
      };
      deviceWorker.publish('jobs', new Buffer(JSON.stringify(data)), 2000);
    }, 2000);
  }

  static noValue() {
    setInterval(() => {
      const data = {};
      deviceWorker.publish('jobs', new Buffer(JSON.stringify(data)), 3000);
    }, 3000);
  }
}

module.exports = DeviceStrategy;
