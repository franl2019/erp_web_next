import {isDateString, registerDecorator, ValidationArguments, ValidationOptions} from 'class-validator';

export function IsDateString(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'ErpIsDateString',
            target: object.constructor,
            propertyName: propertyName,
            options: {
                message:`时间类型错误`,
                ...validationOptions,
            },
            validator: {
                validate(value: any, _args: ValidationArguments) {
                    return isDateString(value)
                },
            },
        });
    };
}