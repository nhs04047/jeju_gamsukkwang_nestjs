import { TourSearchDto } from './dto/tour.search.dto';
import { TourService } from './tour.service';
import { Controller, Get, Patch, Query } from '@nestjs/common';

@Controller('tour')
export class TourController {
  constructor(private readonly tourService: TourService) {}

  @Get()
  getAllLandmarks() {
    return this.tourService.getAllLandmarks();
  }

  @Get('search')
  searchLandmark(@Query('name') name: TourSearchDto) {
    console.log(name);
    return this.tourService.serchLandmark(name);
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

  @Patch(':id/onLike')
  addLike() {
    return 'pass';
  }

  @Patch(':id/disLike')
  removeLike() {
    return 'pass';
  }
}
