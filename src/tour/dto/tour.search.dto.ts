import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class TourSearchDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  name: string;
}
