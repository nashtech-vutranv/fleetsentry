import { ApiProperty } from "@nestjs/swagger";
import { plainToInstance, Expose } from "class-transformer";
/**
 * @class: BaseDto
 * @author: vuducdung93@gmail.com
 */
export class BaseDto {
  /**
   * Converts plain (literal) object to class (constructor) object. Also works with arrays.
   * @param obj
   * @usage
   * class Todo(BaseDto){
   *    @Expose()
   *    id:number
   * }
   * TodoDto.plainToInstance(obj)
   */
  static plainToInstance<T, V>(this: new (...args: any[]) => T, obj: V): V extends Array<any> ? T[] : T {
    return plainToInstance(this, obj, { excludeExtraneousValues: true }) as any;
  }
}
export class UserBaseInfoDto {
  @ApiProperty()
  @Expose()
  lastname: string;

  @ApiProperty()
  @Expose()
  firstname: string;

  @ApiProperty()
  @Expose()
  lastname_kana: string;

  @ApiProperty()
  @Expose()
  firstname_kana: string;

  @ApiProperty()
  @Expose()
  firstname_en: string;

  @ApiProperty()
  @Expose()
  lastname_en: string;
}
