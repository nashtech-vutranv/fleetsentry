import { registerDecorator, ValidationArguments } from "class-validator";

function isNotConsecutiveDigits(value: string, rangeFrom: number): boolean {
  const patternAsc = Array.from({ length: 10 }, (_, i) => i).join("");
  const patternDsc = Array.from({ length: 10 }, (_, i) => 9 - i).join("");
  if (patternAsc.includes(value) || patternDsc.includes(value)) return false;
  return true;
}

function isNotHaveConsecutiveDigits(value: string & any, rangeFrom: number): boolean {
  let arr = [];
  //flags representing the increase or decrease of the sequence of numbers
  let flag = true;

  for (let v of value) {
    v = parseInt(v);
    if (arr.length === 0) {
      arr.push(v);
      continue;
    }
    if (arr.length === rangeFrom) break;

    const minus = v - arr[arr.length - 1];

    if (Math.abs(minus) !== 1) {
      arr = [v];
      continue;
    }

    if (arr.length === 1) {
      arr.push(v);
      flag = minus > 0;
      continue;
    }

    if (flag !== minus > 0) {
      arr = [arr[arr.length - 1], v];
      flag = minus > 0;
    } else {
      arr.push(v);
    }
  }

  return arr.length < rangeFrom;
}
const handleConsecutiveDigits = {
  shallow: isNotConsecutiveDigits,
  deep: isNotHaveConsecutiveDigits,
};
/**
 * check string with consecutive characters
 * @param rangeFrom
 * @param mode
 */
export function IsNotConsecutiveDigits(rangeFrom: number, mode: "shallow" | "deep" = "deep") {
  return function (object: Object, propertyName: string) {
    return registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      constraints: [propertyName],

      validator: {
        async validate(value: string, args: ValidationArguments) {
          const re = new RegExp(`[0-9]{${rangeFrom},}`, "g");
          const matchs = value.match(re);
          if (!matchs) return true;

          for (const match of matchs) {
            if (!handleConsecutiveDigits[mode](match, rangeFrom)) return false;
          }
          return true;
        },
        defaultMessage(args?: ValidationArguments) {
          return `$property must not use consecutive numeric characters`;
        },
      },
    });
  };
}
