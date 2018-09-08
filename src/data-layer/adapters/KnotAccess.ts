import _ from 'lodash';
import meshblu from 'meshblu';
import isBase64 from 'is-base64';
import * as config from 'config';

export class KnotAccess {

    private static knotInstance: KnotAccess = new KnotAccess();

    constructor() {
        if (KnotAccess.knotInstance) {
            throw new Error("Error: Instantiation failed: Use KnotAccess.getInstance() instead of new.");
        }
        KnotAccess.knotInstance = this;
    }

    public static getInstance(): KnotAccess {
        return KnotAccess.knotInstance;
    }

    createConnection() {
        const { server, port, uuid, token } = config.get('meshblu');
        return meshblu.createConnection({ server, port, uuid, token });
    }

    connect() {

        return new Promise((resolve, reject) => {

            const connection = this.createConnection();

            connection.on('ready', () => {
                resolve(connection);
            });

            connection.on('notReady', () => {
                connection.close(() => { });
                reject(new Error('Connection not authorized'));
            });
        });
    }

    toGatewayUuid(uuid: string) {
        return `${uuid.substr(0, uuid.length - 4)}0000`;
    }

    mapData(data: any) {
        const newData = _.omit(data, [
            'uuid',
            'source',
            '_id',
        ]);
        newData.data = _.omit(newData.data, [
            'uuid',
            'token',
        ]);
        return newData;
    }


    mapDevice(device: any) {
        return _.omit(device, [
            'uuid',
            '_id',
            'owner',
            'type',
            'ipAddress',
            'token',
            'meshblu',
            'discoverWhitelist',
            'configureWhitelist',
            'socketid',
            'secure',
            'get_data',
            'set_data',
        ]);
    }

    getDevices(connection: any, id: string) {
        return new Promise((resolve, reject) => {
            if (!connection) {
                reject(new Error('Not connected'));
                return;
            }

            connection.devices({ gateways: ['*'] }, (result) => {
                if (result.error) {
                    reject(result.error);
                    return;
                }

                const device = !id ? result : result.find(d => d.id == id)

                resolve(device);
            });
        });
    }

    async getDeviceUuid(connection: any, id: string) {
        const device = await this.getDevices(connection, id);
        if (!device) {
            throw new Error('Not found');
        }
        return device;
    }

    parseValue(value: any) : any{
        if (isNaN(value)) {
            if (value === 'true' || value === 'false') {
                return (value === 'true');
            }
            if (!isBase64(value)) {
                throw new Error('Supported types are boolean, number or Base64 strings');
            }
            return value;
        }

        return parseFloat(value);
    }
}

