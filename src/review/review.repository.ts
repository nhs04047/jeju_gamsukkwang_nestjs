import { Module } from '@nestjs/common';
import { ReviewModule } from './review.module';
import { Review, ReviewDocument } from './review.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

export class ReviewRepository {
  constructor(
    @InjectModel(Review.name) private ReviewModule: Model<ReviewDocument>,
  ) {}

  async findReviewData(tourId: string) {
    const calc = await this.ReviewModule.aggregate([
      { $match: { tourId } },
      { $group: { _id: null, avg: { $avg: '$rating' }, cnt: { $sum: 1 } } },
    ]);

    if (calc.length === 0) {
      const newObj = {
        cnt: 0,
        avg: 0,
      };
      calc.push(newObj);
    }

    const totalReview = calc[0].cnt; // 총 리뷰 수
    const avgRating = calc[0].avg.toFixed(1); // 총 리뷰 평점의 평균 (소수점 첫째자리까지 반올림)

    // _id: 별점(5, 4, 3, 2, 1), cnt: 해당 별점의 리뷰 개수
    // * 예시. [ { _id: 5, cnt: 1 }, { _id: 2, cnt: 2 } ]
    const starCount = await this.ReviewModule.aggregate([
      { $match: { tourId } },
      { $group: { _id: '$rating', cnt: { $sum: 1 } } },
    ]);

    const starDic = Object.assign(
      {},
      ...starCount.map((x) => ({ [x._id]: x.cnt })),
    );

    const starRating = [];

    for (let i = 5; i > 0; i--) {
      const starObj = {
        star: i,
        reviews: starDic[i] ?? 0,
      };
      starRating.push(starObj);
    }

    return {
      totalReview,
      avgRating,
      starRating,
    };
  }
}
