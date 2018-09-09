import { IWaterFlowDocument } from "../data-abstracts/repositories/index";

/**
 * @description  here we will have getters and setters of waterFlowModel
 */

export class WaterFlowModel {
    private _waterFlowModel: IWaterFlowDocument;

    constructor(iWaterFlowDocument: IWaterFlowDocument) {
        this._waterFlowModel = iWaterFlowDocument;
    }

    get id(): string {
        return (this._waterFlowModel.id).toString();
    }

    get shipping(): string {
        return JSON.stringify(this._waterFlowModel.shipping);
    }

    get desc(): any {
        return this._waterFlowModel.desc;
    }

    get name(): string {
        return this._waterFlowModel.name.toString();
    }

    get category(): string {
        return this._waterFlowModel.category.toString();
    }

    get attrs(): any {
        return this._waterFlowModel.attrs;
    }

    get feedbackEmail(): string {
        return this._waterFlowModel.feedbackEmail.toString();
    }

    get description(): string {
        return this._waterFlowModel.description.toString();
    }

    get addedAt(): Date {
        return new Date(this._waterFlowModel.createdAt);
    }

    get ownerId(): string {
        return this._waterFlowModel.ownerId.toString();
    }

    getClientWaterFlowModel() {
        return Object.seal({
            id: (this._waterFlowModel.id).toString(),
            shipping: this._waterFlowModel.shipping,
            desc: this._waterFlowModel.desc,
            name: this._waterFlowModel.name.toString(),
            category: this._waterFlowModel.category.toString(),
            feedbackEmail: this._waterFlowModel.feedbackEmail.toString()
        })
    }
}