"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
class WaterFlowValidationSchema {
    constructor(waterFlowInfo) {
        this.name = waterFlowInfo.name;
        this.description = waterFlowInfo.description;
        this.category = waterFlowInfo.category;
        this.feedbackEmail = waterFlowInfo.feedbackEmail;
        this.ownerId = waterFlowInfo.ownerId;
        this.desc = waterFlowInfo.desc;
        this.brand = waterFlowInfo.brand;
        this.shipping = waterFlowInfo.shipping;
        this.attrs = waterFlowInfo.attrs;
    }
}
__decorate([
    class_validator_1.Length(5, 50),
    __metadata("design:type", String)
], WaterFlowValidationSchema.prototype, "name", void 0);
__decorate([
    class_validator_1.MinLength(2, { message: "Title is too Short" }),
    class_validator_1.MaxLength(500, { message: "Title is too long" }),
    __metadata("design:type", String)
], WaterFlowValidationSchema.prototype, "description", void 0);
__decorate([
    class_validator_1.Length(2, 15),
    __metadata("design:type", String)
], WaterFlowValidationSchema.prototype, "category", void 0);
__decorate([
    class_validator_1.IsEmail(),
    __metadata("design:type", String)
], WaterFlowValidationSchema.prototype, "feedbackEmail", void 0);
__decorate([
    class_validator_1.MinLength(2, { message: "Not Valid Owner Id" }),
    class_validator_1.MaxLength(10, { message: "Not Valid Owner Id" }),
    __metadata("design:type", String)
], WaterFlowValidationSchema.prototype, "ownerId", void 0);
__decorate([
    class_validator_1.ValidateNested(),
    __metadata("design:type", Array)
], WaterFlowValidationSchema.prototype, "desc", void 0);
exports.WaterFlowValidationSchema = WaterFlowValidationSchema;
class Description {
}
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.Length(2, 15),
    __metadata("design:type", String)
], Description.prototype, "lang", void 0);
__decorate([
    class_validator_1.MinLength(2, { message: "value is too Short" }),
    class_validator_1.MaxLength(500, { message: "Value is too long" }),
    __metadata("design:type", String)
], Description.prototype, "val", void 0);
exports.Description = Description;
class Brand {
}
exports.Brand = Brand;
class Shipping {
}
exports.Shipping = Shipping;
class Attrs {
}
exports.Attrs = Attrs;
//# sourceMappingURL=WaterFlowValidationSchema.js.map