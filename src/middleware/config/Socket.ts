import * as io from 'socket.io';
import { logger } from '../../middleware/common/Logging';
import { WaterFlowUtils } from '../../middleware/common/Utils';


export class KnotSocket {

  waterFlowUtils: WaterFlowUtils;

  constructor() {

    this.waterFlowUtils = new WaterFlowUtils();

    const url = `http://knot-test.cesar.org.br:3000`;
    const socket = require('socket.io-client')(url);

    socket.on('connect', () => {
    logger.info('Smart Hydrometer connected');
      socket.emit('identity', {
        uuid: 'fdf6cbee-1a70-4099-8285-1e300a8a0000',
        token: '1c698e0cb986d279855ff7653428fe83c8b39cac'
      });

    });

    socket.on('ready', () => {
      logger.info('Smart Hydrometer has started');
      setInterval(() => {

        const flowRate = this.waterFlowUtils.randomInRange(66.12345, 125.99999);
        socket.emit('message', {
          devices: 'fdf6cbee-1a70-4099-8285-1e300a8a0000',
          message: { flowRate }
        });

        console.log('sent flow rate:', flowRate);

        socket.on('message', data => {
          console.log("data", data)
        });
      }, 1000);
    });

    socket.on('disconnect', () => {
      console.log('Smart Hydrometer Client has disconnected...');
    });
  }
}
// }

// export function setupSockets(app) {

//   waterFlowUtils: WaterFlowUtils;

//   const url = `http://knot-test.cesar.org.br:3000`;
//   const socket = require('socket.io-client')(url);

//   socket.on('connect', () => {

//     socket.emit('identity', {
//       uuid: 'fdf6cbee-1a70-4099-8285-1e300a8a0000',
//       token: '1c698e0cb986d279855ff7653428fe83c8b39cac'
//     });

//   });

//   socket.on('ready', () => {
//     console.log('Smart Hydrometer Client has started');
//     console.log('ready!');
//     setInterval(() => {

//       const flowRate = this.waterFlowUtils.randomInRange(66.12345, 125.99999);
//       socket.emit('message', {
//         devices: 'fdf6cbee-1a70-4099-8285-1e300a8a0000',
//         message: { flowRate }
//       });

//       console.log('sent flow rate:', flowRate);

//       socket.on('message', data => {
//         console.log("data", data)
//       });
//     }, 1000);
//   });

//   socket.on('disconnect', () => {
//     console.log('Smart Hydrometer Client has disconnected...');
//   });

//   return io;
// };

