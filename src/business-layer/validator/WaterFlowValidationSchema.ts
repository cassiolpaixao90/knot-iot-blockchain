import { IsEmail, Length, IsAlphanumeric, IsAlpha, MinLength, MaxLength, IsNotEmpty, ValidateNested } from "class-validator";


export class WaterFlowValidationSchema {
    //we can similarly add lots of other validations
    @Length(5, 50)
    name: string;

    @MinLength(2, { message: "Title is too Short" })
    @MaxLength(500, { message: "Title is too long" })
    description: string;

    @Length(2, 15)
    category: string;

    @IsEmail()
    feedbackEmail: string;

    @MinLength(2, { message: "Not Valid Owner Id" })
    @MaxLength(10, { message: "Not Valid Owner Id" })
    ownerId: string;

    createdAt: Date;
    modifiedAt: Date

    @ValidateNested()
    desc: Description[]
    brand: Brand;
    shipping: Shipping;
    attrs: Attrs[];

    constructor(waterFlowInfo: any) {
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

export class Description {

    @IsNotEmpty()
    @Length(2, 15)
    lang: string;

    @MinLength(2, { message: "value is too Short" })
    @MaxLength(500, { message: "Value is too long" })
    val: string;

}

export class Brand {
    id: number;
    name: string;
}

export class Shipping {
    dimensions: {
        height: number,
        length: number,
        width: number
    };
    weight: number
}

export class Attrs {
    name: string;
    value: string
}