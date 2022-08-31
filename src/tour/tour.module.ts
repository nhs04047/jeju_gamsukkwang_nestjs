import { ReviewModule } from './../review/review.module';
import { Tour, TourSchema } from './tour.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { TourRepository } from './tour.repository';
import { forwardRef, Module } from '@nestjs/common';
import { TourController } from './tour.controller';
import { TourService } from './tour.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Tour.name, schema: TourSchema }]),
    forwardRef(() => ReviewModule),
    HttpModule,
  ],
  controllers: [TourController],
  providers: [TourRepository, TourService],
  exports: [TourRepository],
})
export class TourModule {}
