import {isNumber, registerDecorator, ValidationArguments, ValidationOptions} from 'class-validator';
import {valueName} from "@/config/valueName";

export function ErpIsArray(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'ErpIsArray',
            target: object.constructor,
            propertyName: propertyName,
            options: {
                message:`未添加${valueName[propertyName] || propertyName}`,
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