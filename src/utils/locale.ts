import { LocaleEnum } from "src/enums";

/**
 * @author vungpv93@gmail.com
 * @functionName isLocaleJP
 * @param locale
 * @return boolean
 */
export const isLocaleJP = (locale: string) => {
  return locale === LocaleEnum.Japan;
};
