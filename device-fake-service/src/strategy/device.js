const deviceUtil = require('../utils/device-utils');
const deviceWorker = require('../workers/worker');

class DeviceStrategy {
  static water() {
    setInterval(() => {
      const flowRate = new String(deviceUtil.randomInRange(66.12345, 125.99999));
      const newAdress = new String(`fdf6cbee-1a70-4099-8285-1e300a8a0000${deviceUtil.dateTimes()}`);
      const data = {
        userNumber: 'dc099880ee7d2b16e956b33cbd8b71d7cf5fdb85a3d14aea434572936a0afbd7',
        address: newAdress.valueOf(),
        cost: flowRate.valueOf(),
        anomalia: '0'
      };
      deviceWorker.publish('jobs', new Buffer(JSON.stringify(data)), 10000);
    }, 10000);
  }

  static anomalia() {
    setInterval(() => {
      const newAdress = new String(`fdf6cbee-1a70-4099-8285-1e300a8a0000${deviceUtil.dateTimes()}`);
      const data = {
        userNumber: 'dc099880ee7d2b16e956b33cbd8b71d7cf5fdb85a3d14aea434572936a0afbd7',
        address: newAdress.valueOf(),
        cost: '',
        anomalia: '1'
      };
      deviceWorker.publish('jobs', new Buffer(JSON.stringify(data)), 20000);
    }, 20000);
  }

  static noValue() {
    setInterval(() => {
      const data = {};
      // deviceWorker.publish('jobs', new Buffer(JSON.stringify(data)), 3000);
    }, 3000);
  }
}

module.exports = DeviceStrategy;
