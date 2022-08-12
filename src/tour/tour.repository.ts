import { TourSearchDto } from './dto/tour.search.dto';
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

  async searchByName(name: TourSearchDto): Promise<Tour[]> {
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
}
