import { IsEnum, IsInt, IsOptional, Min } from 'class-validator';
import { GetListHead } from './../communityGetListHead.enum';
export class CommunityGetListDto {
  @IsInt()
  @Min(1)
  @IsOptional()
  page?: number = 1;

  @IsInt()
  @Min(1)
  @IsOptional()
  limit?: number = 10;

  @IsEnum(GetListHead)
  @IsOptional()
  head?: GetListHead | string = '';
}
