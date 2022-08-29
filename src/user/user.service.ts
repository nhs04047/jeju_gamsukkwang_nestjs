import { TourRepository } from './../tour/tour.repository';
import { UserRepository } from './user.repository';
import { UserupdatetDto } from './dto/user.update.dto';
import { Injectable, HttpException } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly tourRepository: TourRepository,
  ) {}

  async setUser(id: string, toUpdate: UserupdatetDto) {
    const { nickname } = toUpdate;

    const isNicknameExist = await this.userRepository.existByNickname(nickname);
    if (isNicknameExist) {
      throw new HttpException('system.error.duplicatedNickname', 400);
    }

    const updatedUser = await this.userRepository.update(id, toUpdate);

    return updatedUser;
  }

  async addStamp(userId: string, tourId: string) {
    const isTourExist = await this.tourRepository.isLandmarkExist(tourId);
    if (!isTourExist) {
      throw new HttpException('system.error.noSuchTourId', 400);
    }

    const updatedUser = await this.userRepository.addStamp(userId, tourId);

    return updatedUser;
  }

  async addExp(userId: string, point: number) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new HttpException('system.error.noUser', 400);
    }

    return await this.userRepository.updateExp(userId, point);
  }

  async withdrawUser(id: string) {
    return this.userRepository.deleteById(id);
  }
}
