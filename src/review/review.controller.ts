import { ReviewPaginationDto } from './dto/review.pagination.dto';
import { ReviewService } from './review.service';
import { UserCurrentDto } from './../user/dto/user.current.dto';
import { JwtAuthGuard } from './../account/jwt/jwt.guard';
import {
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CurrentUser } from 'src/common/decorator.ts/user.decorator';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post('review')
  addReivew() {
    return 'pass';
  }

  // 해당 랜드마크의 전체 리뷰 목록 가져오기
  // 반환
  // total: 전체 리뷰 갯수
  // totalPage: 전체 페이지 갯수
  // reviews: 실제 리뷰 정보
  @Get(':tourId/list')
  async getReviews(
    @Param('tourId') tourId: string,
    @Query() { page, limit }: ReviewPaginationDto,
  ) {
    return await this.reviewService.getReviews({ tourId, page, limit });
  }

  // 해당 랜드마크 리뷰 요약 정보 가져오기
  // totalReview : 전체 리뷰 갯수
  // avgRating : 평점 평균
  // starRating : 각 평점 별 리뷰 갯수
  @Get(':tourId/info')
  getReviewInfo(@Param('tourId') tourId: string) {
    return this.reviewService.getReviewInfo(tourId);
  }

  @Patch(':id')
  setReview() {
    return 'pass';
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteReview(@CurrentUser() user: UserCurrentDto, @Param('id') id: string) {
    return this.reviewService.deleteReview(user.id, id);
  }
}
