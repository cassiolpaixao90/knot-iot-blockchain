"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Logging_1 = require("../../middleware/common/Logging");
const Utils_1 = require("../../middleware/common/Utils");
const WaterFlowDataAgent_1 = require("../../data-layer/data-agents/WaterFlowDataAgent");
class KnotSocket {
    constructor() {
        this.waterFlowUtils = new Utils_1.WaterFlowUtils();
        this.waterFlowDataAgent = new WaterFlowDataAgent_1.WaterFlowDataAgent();
        const url = `http://knot-test.cesar.org.br:3000`;
        const socket = require('socket.io-client')(url);
        socket.on('connect', () => {
            Logging_1.logger.info('Smart Hydrometer connected');
            socket.emit('identity', {
                uuid: 'fdf6cbee-1a70-4099-8285-1e300a8a0000',
                token: '1c698e0cb986d279855ff7653428fe83c8b39cac'
            });
        });
        socket.on('ready', () => {
            Logging_1.logger.info('Smart Hydrometer has started');
            setInterval(() => {
                const flowRate = this.waterFlowUtils.randomInRange(66.12345, 125.99999);
                socket.emit('message', {
                    devices: 'fdf6cbee-1a70-4099-8285-1e300a8a0000',
                    message: { flowRate }
                });
                console.log('sent flow rate:', flowRate);
                socket.on('message', data => {
                    // this.waterFlowDataAgent.createNewWaterFlow(data);
                });
            }, 1000);
        });
        socket.on('disconnect', () => {
            console.log('Smart Hydrometer Client has disconnected...');
        });
    }
}
exports.KnotSocket = KnotSocket;
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
//# sourceMappingURL=Socket.js.map