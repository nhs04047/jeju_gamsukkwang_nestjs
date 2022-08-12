import { TourSearchDto } from './dto/tour.search.dto';
import { TourRepository } from './tour.repository';
import { HttpException, Injectable } from '@nestjs/common';

@Injectable()
export class TourService {
  constructor(private readonly tourRepository: TourRepository) {}

  getAllLandmarks() {
    return this.tourRepository.findAll();
  }

  async serchLandmark(data: TourSearchDto) {
    const searchedTours = await this.tourRepository.searchByName(data.name);
    if (searchedTours.length === 0) {
      throw new HttpException('system.error.noLandmark', 400);
    }
    return searchedTours;
  }
}
