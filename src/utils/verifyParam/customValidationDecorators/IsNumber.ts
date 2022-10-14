import {isNumber, registerDecorator, ValidationArguments, ValidationOptions} from 'class-validator';

export function IsNumber(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'ErpIsNumber',
            target: object.constructor,
            propertyName: propertyName,
            options: {
                message:`只能输入数字`,
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