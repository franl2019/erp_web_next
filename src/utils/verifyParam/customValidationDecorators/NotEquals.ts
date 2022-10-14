import {notEquals, registerDecorator, ValidationArguments, ValidationOptions} from 'class-validator';
import {valueName} from "@/config/valueName";

export function ErpNotEquals(comparison:any,validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'ErpNotEquals',
            target: object.constructor,
            propertyName: propertyName,
            options: {
                message:`请选择${valueName[propertyName] || propertyName}`,
                ...validationOptions,
            },
            validator: {
                validate(value: any, _args: ValidationArguments) {
                    return notEquals(value,comparison)
                },
            },
        });
    };
}