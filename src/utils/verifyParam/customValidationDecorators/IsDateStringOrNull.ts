import {isDateString, registerDecorator, ValidationArguments, ValidationOptions} from 'class-validator';

export function IsDateStringOrNull(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'ErpIsDateStringOrNull',
            target: object.constructor,
            propertyName: propertyName,
            options: {
                message:`时间类型错误`,
                ...validationOptions,
            },
            validator: {
                validate(value: any, _args: ValidationArguments) {
                    return isDateString(value) || value === "" || value === null
                },
            },
        });
    };
}