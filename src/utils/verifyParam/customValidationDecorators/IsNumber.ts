import {isNumber, registerDecorator, ValidationArguments, ValidationOptions} from 'class-validator';
import {valueName} from "@/config/valueName";

export function ErpIsNumber(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'ErpIsNumber',
            target: object.constructor,
            propertyName: propertyName,
            options: {
                message:`${valueName[propertyName] || propertyName}只能输入数字`,
                ...validationOptions,
            },
            validator: {
                validate(value: any, _args: ValidationArguments) {
                    return isNumber(value)
                },
            },
        });
    };
}