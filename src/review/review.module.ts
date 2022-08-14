import { MongooseModule } from '@nestjs/mongoose';
import { Review, ReviewSchema } from './review.schema';
import { ReviewRepository } from './review.repository';
import { Module } from '@nestjs/common';
import { ReviewController } from './review.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Review.name, schema: ReviewSchema }]),
  ],
  controllers: [ReviewController],
  providers: [ReviewRepository],
  exports: [ReviewRepository],
})
export class ReviewModule {}
