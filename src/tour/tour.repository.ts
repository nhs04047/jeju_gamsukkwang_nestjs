import { ReviewRepository } from './../review/review.repository';
import { Tour, TourDocument } from './tour.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

export class TourRepository {
  constructor(
    private readonly reviewRepository: ReviewRepository,
    @InjectModel(Tour.name) private tourModule: Model<TourDocument>,
  ) {}

  async findAll(): Promise<Tour[]> {
    const tours = this.tourModule.find();
    return tours;
  }

  async isLandmarkExist(id: string): Promise<any> {
    const result = await this.tourModule.exists({ id });
    return result;
  }

  async searchLandmarkByName(name: string): Promise<Tour[]> {
    const condition = [
      {
        $search: {
          index: 'searchByName',
          text: {
            query: name,
            path: 'krTitle',
          },
        },
      },
    ];
    const searchLandmark = await this.tourModule.aggregate(condition);
    return searchLandmark;
  }

  async findLandmarkById(id: string): Promise<Tour> {
    const landmark = await this.tourModule.findOne({ id });
    return landmark;
  }

  async didUserLiked(landmarkId: string, userId: string) {
    const didUserLiked = await this.tourModule.exists({
      $and: [{ id: landmarkId }, { likedUsers: userId }],
    });
    if (didUserLiked) {
      return true;
    }

    return false;
  }

  async addLike(landmarkId: string, userId: string) {
    const filter = { id: landmarkId };
    const update = {
      $inc: { likeCount: 1 },
      $push: { likedUsers: userId },
    };
    const option = { returnOriginal: false };

    const addLikeCount = await this.tourModule.findOneAndUpdate(
      filter,
      update,
      option,
    );

    return addLikeCount;
  }

  async removeLike(landmarkId: string, userId: string) {
    const filter = { id: landmarkId };
    const update = {
      $inc: { likeCount: -1 },
      $pull: { likedUsers: userId },
    };
    const option = { returnOriginal: false };

    const addLikeCount = await this.tourModule.findOneAndUpdate(
      filter,
      update,
      option,
    );

    return addLikeCount;
  }

  async sortByLiked() {
    const sortByLiked = await this.tourModule
      .find({}, { _id: 0, id: 1, krTitle: 1, likeCount: 1, image: 1 })
      .sort({ likeCount: -1 });
    return sortByLiked;
  }

  async sortByReviews() {
    const tourIds = await this.tourModule.find(
      {},
      { _id: 0, id: 1, krTitle: 1, image: 1 },
    );
    const newArray = [];

    for (let i = 0; i < tourIds.length; i++) {
      const newObj = {
        id: 'none',
        krTitle: 'none',
        image: 'none',
        totalReview: 0,
      };
      const result = await this.reviewRepository.findReviewData(tourIds[i].id);

      newObj.id = tourIds[i].id;
      newObj.krTitle = tourIds[i].krTitle;
      newObj.image = tourIds[i].image;
      newObj.totalReview = result.totalReview;

      newArray.push(newObj);
    }

    newArray.sort((a, b) => {
      return b.totalReview - a.totalReview;
    });

    return newArray;
  }

  async sortByRating() {
    const tourIds = await this.tourModule.find(
      {},
      { _id: 0, id: 1, krTitle: 1, image: 1 },
    );
    const newArray = [];

    for (let i = 0; i < tourIds.length; i++) {
      const newObj = {
        id: 'none',
        krTitle: 'none',
        image: 'none',
        avgRating: 0,
      };
      const result = await this.reviewRepository.findReviewData(tourIds[i].id);

      newObj.id = tourIds[i].id;
      newObj.krTitle = tourIds[i].krTitle;
      newObj.image = tourIds[i].image;
      newObj.avgRating = Number(result.avgRating);

      newArray.push(newObj);
    }

    newArray.sort((a, b) => {
      return b.avgRating - a.avgRating;
    });

    return newArray;
  }
}
