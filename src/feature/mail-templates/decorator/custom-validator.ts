import { registerDecorator, ValidationOptions, ValidationArguments } from "class-validator";

export function IsNonNullEmail(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "isNonNullEmail",
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (value) {
            console.log("value", value);
            return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value);
          }
          return true;
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a non-null email address`;
        },
      },
    });
  };
}
