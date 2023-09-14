import { IsNotEmpty, IsInt, IsArray, IsNumber, ArrayMaxSize } from "class-validator";

export class StoreBody {
  @IsInt()
  @IsNotEmpty()
  inspection_type_id: number;

  @IsArray()
  @ArrayMaxSize(250)
  @IsNumber({}, { each: true })
  items: number[];
}
