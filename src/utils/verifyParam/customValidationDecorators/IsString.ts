import {isString, registerDecorator, ValidationArguments, ValidationOptions} from 'class-validator';

export function IsString(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'ErpIsString',
            target: object.constructor,
            propertyName: propertyName,
            options: {
                message:`只能输入字符`,
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