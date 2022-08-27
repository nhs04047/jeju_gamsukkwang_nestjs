import { Review } from './../review.schema';
import { PickType } from '@nestjs/swagger';
export class CreateReviewDto extends PickType(Review, [
  'tourId',
  'content',
  'rating',
] as const) {}
