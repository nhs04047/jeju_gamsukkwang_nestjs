import { ReviewRepository } from './review.repository';
import { Injectable, HttpException } from '@nestjs/common';

@Injectable()
export class ReviewService {
  constructor(private readonly reviewRepository: ReviewRepository) {}

  async deleteReview(userId: string, reviewId: string) {
    const currentReview = await this.reviewRepository.findById(reviewId);
    if (!currentReview) {
      throw new HttpException('system.error.noReview', 400);
    }

    if (userId !== currentReview.id) {
      throw new HttpException('system.error.unAuthorized', 400);
    }
    return this.reviewRepository.deleteById(reviewId);
  }
}
