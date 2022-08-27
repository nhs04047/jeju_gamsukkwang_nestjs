import { TourRepository } from './../tour/tour.repository';
import { CreateReviewDto } from './dto/review.create.dto';
import { UserCurrentDto } from './../user/dto/user.current.dto';
import { ReviewGetListDto } from './dto/review.getList.dto';
import { ReviewRepository } from './review.repository';
import { Injectable, HttpException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ReviewService {
  constructor(
    private readonly reviewRepository: ReviewRepository,
    private readonly tourRepository: TourRepository,
  ) {}

  async addReview(user: UserCurrentDto, review: CreateReviewDto) {
    const { tourId, content, rating } = review;
    const userId = user.id;
    // 리뷰 작성은 랜드마크에 대한 인증을 한 사람만 가능
    const didAuth = user.stamp.find((item) => item === tourId);
    if (!didAuth) {
      throw new HttpException('system.error.noAuthorized', 403);
    }

    const landmark = await this.tourRepository.findLandmarkById(tourId);
    if (!landmark) {
      throw new HttpException('system.error.noLandmark', 400);
    }

    const didPostReview = await this.reviewRepository.isPosted(tourId, userId);
    if (didPostReview) {
      throw new HttpException('system.error.alreadyPosting', 403);
    }

    const id = uuidv4();

    const userNickName = user.nickname;

    const newReview = {
      id,
      tourId,
      userId,
      userNickName,
      content,
      rating,
    };

    const createdNewReview = await this.reviewRepository.create(newReview);
    return createdNewReview;
  }

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
