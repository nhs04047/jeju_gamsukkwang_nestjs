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

  async searchByName(name: string): Promise<Tour> {
    const tour = this.tourModule.findOne({ name });
    return tour;
  }
}
