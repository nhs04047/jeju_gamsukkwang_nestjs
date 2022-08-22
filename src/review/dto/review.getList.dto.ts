import { IsNotEmpty, IsString } from 'class-validator';
import { ReviewPaginationDto } from './review.pagination.dto';
export class ReviewGetListDto extends ReviewPaginationDto {
  @IsString()
  @IsNotEmpty()
  tourId: string;
}
