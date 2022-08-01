import { UserRepository } from './../user/user.repository';
import { RegisterRequestDto } from './dto/register.request.dto';
import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AccountService {
  constructor(private readonly userRepository: UserRepository) {}

  async singUp(data: RegisterRequestDto) {
    const { email, password, nickname } = data;

    const isEmailExist = await this.userRepository.existByEmail(email);
    if (isEmailExist) {
      throw new Error('system.error.duplicatedEmail');
    }

    const isNicknameExist = await this.userRepository.existByNickname(nickname);
    if (isNicknameExist) {
      throw new Error('system.error.duplicatedNickname');
    }

    const id = uuidv4();
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      id,
      email,
      hashedPassword,
      nickname,
    };

    const createdNewUser = await this.userRepository.create(newUser);

    return createdNewUser;
  }
}
