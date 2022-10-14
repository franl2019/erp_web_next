import {isInt, registerDecorator, ValidationArguments, ValidationOptions} from 'class-validator';

export function ErpIsInt(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'ErpIsInt',
            target: object.constructor,
            propertyName: propertyName,
            options: {
                message:`${propertyName}只能是数字`,
                ...validationOptions,
            },
            validator: {
                validate(value: any, _args: ValidationArguments) {
                    return isInt(value)
                },
            },
        });
    };
}