import {isArray, registerDecorator, ValidationArguments, ValidationOptions} from 'class-validator';

export function IsArray(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'ErpIsArray',
            target: object.constructor,
            propertyName: propertyName,
            options: {
                message: `未添加`,
                ...validationOptions,
            },
            validator: {
                validate(value: any, _args: ValidationArguments) {
                    return isArray(value)
                },
            },
        });
    };
}