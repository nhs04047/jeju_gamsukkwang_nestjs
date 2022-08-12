import { Tour, TourDocument } from './tour.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

export class TourRepository {
  constructor(
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
}
