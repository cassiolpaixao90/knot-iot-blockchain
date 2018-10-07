/**
 * @description  here we will have getters and setters of waterFlowModel
 */

export class WaterFlowModel {
  private _uuid: string;
  private _flowRate: string;
  constructor(uuid, flowRate) {
    this._uuid = uuid;
    this._flowRate = flowRate;
  }

  get uuid(): string {
    return this._uuid;
  }

  get flowRate(): string {
    return this._flowRate;
  }

  getClientWorkerStremModel() {
    return Object.seal({
      uuid: this._uuid,
      flowRate: this._flowRate
    });
  }
}
