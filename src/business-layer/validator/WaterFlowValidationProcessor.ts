import { validate } from "class-validator";
import { WaterFlowValidationSchema } from './WaterFlowValidationSchema';
import { forEach, pick } from 'lodash';

async function validateWaterFlowRequest(waterFlowReqObj: any): Promise<any> {
    let validProductData = new WaterFlowValidationSchema(waterFlowReqObj);
    let validationResults = await validate(validProductData);
    let constraints = []
    if (validationResults && validationResults.length > 0) {
        forEach(validationResults, (item) => {
            constraints.push(pick(item, 'constraints', 'property'));
        });
    }
    return constraints;
}


export { validateWaterFlowRequest }