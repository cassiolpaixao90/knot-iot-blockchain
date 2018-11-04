const deviceUtil = require('../utils/device-utils');
const deviceWorker = require('../workers/worker');

class DeviceStrategy {
  static water() {
    setInterval(() => {
      // eslint-disable-next-line no-new-wrappers
      const flowRate = new String(deviceUtil.randomInRange(66.12345, 125.99999));
      const data = {
        uuid: 'fdf6cbee-1a70-4099-8285-1e300a8a0000',
        cost: flowRate.valueOf(),
        anamolia: '0'
      };
      deviceWorker.publish('jobs', new Buffer(JSON.stringify(data)), 10000);
    }, 10000);
  }

  static anomalia() {
    setInterval(() => {
      const data = {
        uuid: 'fdf6cbee-1a70-4099-8285-1e300a8a0000',
        cost: '',
        anamolia: '1'
      };
      console.log(data);
    }, 20000);
  }

  static noValue() {
    setInterval(() => {
      const data = {};
      console.log('nodata', data);
    }, 30000);
  }
}

module.exports = DeviceStrategy;
