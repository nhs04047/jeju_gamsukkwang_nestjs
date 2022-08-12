import { TourRepository } from './tour.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TourService {
  constructor(private readonly tourRepository: TourRepository) {}

  getAllLandmarks() {
    return this.tourRepository.findAll();
  }

  serchLandmark(name: string) {
    return this.tourRepository.searchByName(name);
  }
}
