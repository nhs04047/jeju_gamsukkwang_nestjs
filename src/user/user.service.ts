import { TourRepository } from './../tour/tour.repository';
import { UserRepository } from './user.repository';
import { UserupdatetDto } from './dto/user.update.dto';
import { Injectable } from '@nestjs/common';

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
      throw new Error('system.error.duplicatedNickname');
    }

    const updatedUser = await this.userRepository.update(id, toUpdate);

    return updatedUser;
  }

  async addStamp(userId: string, tourId: string) {
    const isTourExist = await this.tourRepository.isLandmarkExist(tourId);
    if (!isTourExist) {
      throw new Error('system.error.noSuchTourId');
    }

    const updatedUser = await this.userRepository.addStamp(userId, tourId);

    return updatedUser;
  }
}
