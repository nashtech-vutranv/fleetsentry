import { Type } from "class-transformer";
import { IsIn, IsNotEmpty, ValidateIf, ValidateNested } from "class-validator";
import { CreateTypeDto } from "./types.dto";
import { CreateMultiTypeDto } from "./multiTypes.dto";
import { Mode } from "src/enums";

export class CreateCombineTypeDto {
  @IsIn([Mode.Single, Mode.Combine])
  mode: Mode;

  @ValidateIf((o) => o.mode === Mode.Single)
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateTypeDto)
  singleType: CreateTypeDto;

  @ValidateIf((o) => o.mode === Mode.Combine)
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateMultiTypeDto)
  multiType: CreateMultiTypeDto;
}

export class UpdateCombineTypeDto {
  @IsIn([Mode.Single, Mode.Combine])
  mode: Mode;

  @ValidateIf((o) => o.mode === Mode.Single)
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateTypeDto)
  singleType: CreateTypeDto;

  @ValidateIf((o) => o.mode === Mode.Combine)
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateMultiTypeDto)
  multiType: CreateMultiTypeDto;
}
