import { TourSortingOptions } from './tour-criteria.enum';
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
    const searchedTours = await this.tourRepository.searchLandmarkByName(
      data.name,
    );
    if (searchedTours.length === 0) {
      throw new HttpException('system.error.noLandmark', 400);
    }
    return searchedTours;
  }

  async getLandmark(id: string) {
    const landmark = await this.tourRepository.findLandmarkById(id);
    if (!landmark) {
      throw new HttpException('system.error.noLandmark', 400);
    }
    return landmark;
  }

  async addLike(landmarkId: string, userId: string) {
    const isLandmarkExist = await this.tourRepository.isLandmarkExist(
      landmarkId,
    );
    if (!isLandmarkExist) {
      throw new HttpException('system.error.noLandmark', 400);
    }

    const didUserLiked = await this.tourRepository.didUserLiked(
      landmarkId,
      userId,
    );
    // 이미 좋아요를 추가한 상태임을 의미 (boolean 타입 리턴)
    if (didUserLiked) {
      throw new HttpException('system.error.alreadyLiked', 400);
    }

    const addLiketoLandmark = await this.tourRepository.addLike(
      landmarkId,
      userId,
    );

    return addLiketoLandmark;
  }

  async removeLike(landmarkId: string, userId: string) {
    const isLandmarkExist = await this.tourRepository.isLandmarkExist(
      landmarkId,
    );
    if (!isLandmarkExist) {
      throw new HttpException('system.error.noLandmark', 400);
    }

    const didUserLiked = await this.tourRepository.didUserLiked(
      landmarkId,
      userId,
    );
    // 삭제할 좋아요가 없음을 의미 (boolean type 반환)
    if (!didUserLiked) {
      throw new HttpException('system.error.noLiked', 400);
    }

    const removeLikeFromLandmark = await this.tourRepository.removeLike(
      landmarkId,
      userId,
    );

    return removeLikeFromLandmark;
  }

  async getAllSortedLandmarks(criteria: TourSortingOptions) {
    switch (criteria) {
      case 'like':
        return await this.tourRepository.sortByLiked();
      case 'review':
        return await this.tourRepository.sortByReviews();
      case 'rating':
        return await this.tourRepository.sortByRating();
    }
  }
}
