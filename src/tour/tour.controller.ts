import { Controller, Get, Patch } from '@nestjs/common';

@Controller('tour')
export class TourController {
  @Get()
  getAllLandmarks() {
    return 'pass';
  }

  // none: 등록순, like: 좋아요순, review: 리뷰수 순, rating: 평점 평균 순
  @Get('search/:criteria')
  searchAllLandmark() {
    return 'pass';
  }

  @Get('image')
  predictionImage() {
    return 'pass';
  }

  @Get(':id')
  searchLandmark() {
    return 'pass';
  }

  @Patch(':id/onLike')
  addLike() {
    return 'pass';
  }

  @Patch(':id/disLike')
  removeLike() {
    return 'pass';
  }
}
