import { UserRepository } from './user.repository';
import { UserupdatetDto } from './dto/user.update.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async setUser(id: string, toUpdate: UserupdatetDto) {
    const { nickname } = toUpdate;

    const isNicknameExist = await this.userRepository.existByNickname(nickname);
    if (isNicknameExist) {
      throw new Error('system.error.duplicatedNickname');
    }

    const updatedUser = await this.userRepository.update(id, toUpdate);

    return updatedUser;
  }
}
