import { Tour, TourSchema } from './tour.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { TourRepository } from './tour.repository';
import { Module } from '@nestjs/common';
import { TourController } from './tour.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Tour.name, schema: TourSchema }]),
  ],
  controllers: [TourController],
  providers: [TourRepository],
  exports: [TourRepository],
})
export class TourModule {}
