import { Module } from '@nestjs/common';
import { TourController } from './tour.controller';

@Module({
  controllers: [TourController]
})
export class TourModule {}
