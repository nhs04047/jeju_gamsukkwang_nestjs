import { IsInt, IsOptional, Min } from 'class-validator';

export class ReviewPaginationDto {
  @IsInt()
  @Min(1)
  @IsOptional()
  page?: number = 1;

  @IsInt()
  @Min(1)
  @IsOptional()
  limit?: number = 10;
}
