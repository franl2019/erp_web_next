import {isNotEmpty, registerDecorator, ValidationArguments, ValidationOptions} from 'class-validator';

export function IsNotEmpty(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'IsNotEmpty',
            target: object.constructor,
            propertyName: propertyName,
            options: {
                message:`未填写`,
                ...validationOptions,
            },
            validator: {
                validate(value: any, _args: ValidationArguments) {
                    return isNotEmpty(value)
                },
            },
        });
    };
}