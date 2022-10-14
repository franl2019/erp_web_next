import {isString, registerDecorator, ValidationArguments, ValidationOptions} from 'class-validator';
import {valueName} from "@/config/valueName";

export function ErpIsString(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'ErpIsString',
            target: object.constructor,
            propertyName: propertyName,
            options: {
                message:`${valueName[propertyName] || propertyName}只能输入字符`,
                ...validationOptions,
            },
            validator: {
                validate(value: any, _args: ValidationArguments) {
                    return isString(value)
                },
            },
        });
    };
}