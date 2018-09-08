import _ from 'lodash';
import request from 'request';
import meshblu from 'meshblu';
import isBase64 from 'is-base64';


export class KnotAccess {

    static knotInstance: KnotAccess;

    constructor() {
        this.connect();
    }

    getInstance() {
        if (!KnotAccess.knotInstance) {
            KnotAccess.knotInstance = new KnotAccess();
            console.log("Não instanciado");
        }
        console.log("instanciado");
        return KnotAccess.knotInstance;
    }

    connect() {
        console.log("opa conectado!");

    }
}



// function createConnection(hostname, port, uuid, token) {
//   return meshblu.createConnection({
//     server: hostname,
//     port,
//     uuid,
//     token,
//   });
// }

// function connect(hostname, port, uuid, token) {
//   return new Promise((resolve, reject) => {
//     const connection = createConnection(hostname, port, uuid, token);

//     connection.on('ready', () => {
//       resolve(connection);
//     });

//     connection.on('notReady', () => {
//       connection.close(() => {});
//       reject(new Error('Connection not authorized'));
//     });
//   });
// }

// function toGatewayUuid(uuid) {
//   return `${uuid.substr(0, uuid.length - 4)}0000`;
// }

// function mapData(data) {
//   const newData = _.omit(data, [
//     'uuid',
//     'source',
//     '_id',
//   ]);
//   newData.data = _.omit(newData.data, [
//     'uuid',
//     'token',
//   ]);
//   return newData;
// }

// function mapDevice(device) {
//   return _.omit(device, [
//     'uuid',
//     '_id',
//     'owner',
//     'type',
//     'ipAddress',
//     'token',
//     'meshblu',
//     'discoverWhitelist',
//     'configureWhitelist',
//     'socketid',
//     'secure',
//     'get_data',
//     'set_data',
//   ]);
// }

// function getDevices(connection) {
//   return new Promise((resolve, reject) => {
//     if (!connection) {
//       reject(new Error('Not connected'));
//       return;
//     }

//     connection.devices({ gateways: ['*'] }, (result) => {
//       if (result.error) {
//         reject(result.error);
//         return;
//       }

//       resolve(result);
//     });
//   });
// }

// async function getDeviceUuid(connection, id) {
//   const devices = await getDevices(connection);
//   const device = devices.find(d => d.id === id);
//   if (!device) {
//     throw new Error('Not found');
//   }
//   return device.uuid;
// }

// function parseValue(value) {
//   if (isNaN(value)) { // eslint-disable-line no-restricted-globals
//     if (value === 'true' || value === 'false') {
//       return (value === 'true');
//     }
//     if (!isBase64(value)) {
//       throw new Error('Supported types are boolean, number or Base64 strings');
//     }
//     return value;
//   }

//   return parseFloat(value);
// }