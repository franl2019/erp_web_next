import {isInt, registerDecorator, ValidationArguments, ValidationOptions} from 'class-validator';

export function IsInt(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'ErpIsInt',
            target: object.constructor,
            propertyName: propertyName,
            options: {
                message: `只能是整数`,
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