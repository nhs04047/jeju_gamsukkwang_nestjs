import { UserCurrentDto } from './../user/dto/user.current.dto';
import { JwtAuthGuard } from './../account/jwt/jwt.guard';
import { TourSearchDto } from './dto/tour.search.dto';
import { TourService } from './tour.service';
import {
  ConsoleLogger,
  Controller,
  Get,
  Param,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CurrentUser } from 'src/common/decorator.ts/user.decorator';

@Controller('tour')
export class TourController {
  constructor(private readonly tourService: TourService) {}

  @Get()
  getAllLandmarks() {
    return this.tourService.getAllLandmarks();
  }

  @Get('search')
  searchLandmark(@Query() data: TourSearchDto) {
    return this.tourService.serchLandmark(data);
  }

  @Get(':id')
  getLandmark(@Param('id') id: string) {
    return this.tourService.getLandmark(id);
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

  @UseGuards(JwtAuthGuard)
  @Patch(':id/onLike')
  addLike(@CurrentUser() user: UserCurrentDto, @Param('id') id: string) {
    return this.tourService.addLike(id, user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/disLike')
  removeLike(@CurrentUser() user: UserCurrentDto, @Param('id') id: string) {
    return this.tourService.removeLike(id, user.id);
  }
}
