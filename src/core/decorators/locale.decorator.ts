import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { LocaleEnum } from "src/enums";

/**
 * @author vungpv93@gmail.com
 * @class Locale
 */
export const Locale = createParamDecorator((data: string, context: ExecutionContext) => {
  const req = context.switchToHttp().getRequest();

  console.log(req.headers.locale);
  console.log(typeof req.headers.locale);
  if (typeof req.headers.locale === "undefined") {
    return LocaleEnum.English; // TODO: Validator
  }

  if (typeof req.headers.locale !== "string") {
    return LocaleEnum.English; // TODO: Validator
  }

  if ([LocaleEnum.English, LocaleEnum.Japan].includes(req.headers.locale)) return req.headers.locale;
  return LocaleEnum.English;
});
