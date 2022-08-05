import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';

@Controller('review')
export class ReviewController {
  @Post('review')
  addReivew() {
    return 'pass';
  }

  // 해당 랜드마크의 전체 리뷰 목록 가져오기
  // total: 전체 리뷰 갯수
  // totalPage: 전체 페이지 갯수
  // reviews: 실제 리뷰 정보
  @Get(':tourId/list')
  getReviews() {
    return 'pass';
  }

  // 해당 랜드마크 리뷰 요약 정보 가져오기
  // totalReview : 전체 리뷰 갯수
  // avgRating : 평점 평균
  // starRating : 각 평점 별 리뷰 갯수
  @Get(':tourId/info')
  getReviewInfo() {
    return 'pass';
  }

  @Patch(':reviewId')
  setReview() {
    return 'pass';
  }

  @Delete(':reviewId')
  deleteReview() {
    return 'pass';
  }
}
