import { s3Single } from './../common/aws/multerS3';
import { TourSortingOptions } from './enums/tour-criteria.enum';
import { UserCurrentDto } from './../user/dto/user.current.dto';
import { JwtAuthGuard } from './../account/jwt/jwt.guard';
import { TourSearchDto } from './dto/tour.search.dto';
import { TourService } from './tour.service';
import {
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { FileInterceptor } from '@nestjs/platform-express';

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

  // 압력한 정렬 기준(criteria)대로 랜드마크 정렬하기
  // none: 등록순, like: 좋아요순, review: 리뷰수 순, rating: 평점 평균 순
  @Get('search/:criteria')
  searchAllSortedLandmarks(@Param('criteria') criteria: TourSortingOptions) {
    return this.tourService.getAllSortedLandmarks(criteria);
  }

  @Post('image')
  @UseInterceptors(FileInterceptor('file', s3Single()))
  predictionImage(@UploadedFile() file: any) {
    const { location, originalname } = file;
    return this.tourService.predictionImage(location, originalname);
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
