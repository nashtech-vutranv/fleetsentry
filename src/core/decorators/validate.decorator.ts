import { registerDecorator, ValidationOptions, ValidationArguments, validateOrReject } from "class-validator";
export function MyValidateNested(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    return registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [propertyName],

      validator: {
        async validate(value: any, args: ValidationArguments) {
          try {
            await validateOrReject(value, { whitelist: true });
            return true;
          } catch (error) {
            return false;
          }
        },
        defaultMessage(args?: ValidationArguments) {
          return `$property is not match`;
        },
      },
    });
  };
}
