import * as config from 'config';

export class KnotModel {

    private _server: any;
    private _port: any;
    private _uuid: any;
    private _token: any;

    constructor() {
        this._server = config.get('meshblu.server');
        this._port = config.get('meshblu.port');
        this._uuid = config.get('meshblu.uuid');
        this._token = config.get('meshblu.token');
    }

    get server(): string {
        return this._server.toString();
    }

    get port(): string {
        return this._port.toString();
    }

    get uuid(): string {
        return this._uuid.toString();
    }

    get token(): any {
        return this._token.toString();
    }


}