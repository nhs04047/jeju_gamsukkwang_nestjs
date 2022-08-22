import { ReviewGetListDto } from './dto/review.getList.dto';
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

  async getReviews(getReviewsMeta: ReviewGetListDto) {
    return await this.reviewRepository.findByTourId(getReviewsMeta);
  }

  async getReviewInfo(tourId: string) {
    return this.reviewRepository.findReviewData(tourId);
  }
}
