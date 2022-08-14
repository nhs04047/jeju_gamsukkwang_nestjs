import { ReviewModule } from './../review/review.module';
import { Tour, TourSchema } from './tour.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { TourRepository } from './tour.repository';
import { Module } from '@nestjs/common';
import { TourController } from './tour.controller';
import { TourService } from './tour.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Tour.name, schema: TourSchema }]),
    ReviewModule,
  ],
  controllers: [TourController],
  providers: [TourRepository, TourService],
  exports: [TourRepository],
})
export class TourModule {}
