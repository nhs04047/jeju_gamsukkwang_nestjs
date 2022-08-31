import { TourSortingOptions } from './tour-criteria.enum';
import { TourSearchDto } from './dto/tour.search.dto';
import { TourRepository } from './tour.repository';
import { HttpException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import * as dotenv from 'dotenv';
import { lastValueFrom } from 'rxjs';
import exifr from 'exifr';
dotenv.config();

@Injectable()
export class TourService {
  constructor(
    private readonly tourRepository: TourRepository,
    private readonly httpService: HttpService,
  ) {}

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

  async predictionImage(location: string, originalname: string) {
    const checkExtension = /(.jpg$|.JPG$|.jpeg$|.JPEG$)/gi;
    if (!checkExtension.test(originalname)) {
      throw new HttpException('extension only must be JPG, JPEG', 400);
    }
    const checkName = /^[A-Za-z0-9~.\-_]*$/;
    if (!checkName.test(originalname)) {
      throw new Error('Unknown file format');
    }

    let { latitude, longitude } = (await exifr.gps(location)) ?? {
      latitude: 0,
      longitude: 0,
    };
    if (latitude && longitude) {
      latitude = Number(latitude.toFixed(2));
      longitude = Number(longitude.toFixed(2));
    }

    const sendImage = this.httpService.post(
      `${process.env.AI_SERVER_URL}/prediction`,
      {
        imageURL: location, // s3에 저장된 이미지 url을 ai로 보내기
      },
      {
        headers: {
          'content-type': 'application/json',
        },
      },
    );
    const predicted = await (await lastValueFrom(sendImage)).data;

    const result = {
      latitude,
      longitude,
      predicted,
    };
    return result;
  }
}
