import {notEquals, registerDecorator, ValidationArguments, ValidationOptions} from 'class-validator';

export function NotEquals(comparison:any, validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'ErpNotEquals',
            target: object.constructor,
            propertyName: propertyName,
            options: {
                message:`未选择`,
                ...validationOptions,
            },
            validator: {
                validate(value: any, _args: ValidationArguments) {
                    console.log(notEquals("",""))
                    return notEquals(value,comparison)
                },
            },
        });
    };
}