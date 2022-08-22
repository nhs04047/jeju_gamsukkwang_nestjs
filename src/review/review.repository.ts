import { ReviewGetListDto } from './dto/review.getList.dto';
import { Review, ReviewDocument } from './review.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

export class ReviewRepository {
  constructor(
    @InjectModel(Review.name) private reviewModule: Model<ReviewDocument>,
  ) {}

  async findById(id: string): Promise<Review> {
    return this.reviewModule.findOne({ id });
  }

  async deleteById(id: string): Promise<any> {
    return this.reviewModule.deleteOne({ id });
  }

  async findReviewData(tourId: string) {
    const calc = await this.reviewModule.aggregate([
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
    const starCount = await this.reviewModule.aggregate([
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

  async findByTourId(getReviewsMeta: ReviewGetListDto) {
    const { tourId, page, limit } = getReviewsMeta;
    const total = await this.reviewModule.countDocuments({ tourId });
    const offset = (page - 1) * limit;
    let totalPage = Math.floor(total / limit);

    if (total % limit !== 0) {
      totalPage = Math.floor(total / limit) + 1;
    }

    const reviews = await this.reviewModule
      .find({ tourId })
      .limit(limit)
      .skip(offset)
      .sort({ createdAt: -1 }); //리뷰 목록 최신순으로

    return {
      total,
      totalPage,
      reviews,
    };
  }
}
