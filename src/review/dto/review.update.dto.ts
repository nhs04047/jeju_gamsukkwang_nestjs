import { PickType } from '@nestjs/swagger';
import { Review } from './../review.schema';
export class ReviewUpdateDto extends PickType(Review, [
  'content',
  'rating',
] as const) {}
