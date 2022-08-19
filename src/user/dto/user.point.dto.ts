import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator';

export class userPointDto {
  @IsNumber()
  @Min(-100)
  @Max(100)
  @IsNotEmpty()
  point: number;
}
