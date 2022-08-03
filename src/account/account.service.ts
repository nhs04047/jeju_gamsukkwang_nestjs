import { LoginRequestDto } from './dto/login.request.dto';
import { UserRepository } from './../user/user.repository';
import { RegisterRequestDto } from './dto/register.request.dto';
import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AccountService {
  constructor(
    private readonly userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

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

  async login(data: LoginRequestDto) {
    const { email, password } = data;
    const user = await this.userRepository.findUserByEmail(email);
    if (!user) {
      throw new Error('system.error.noUser');
    }

    const { id, nickname, hashedPassword } = user;

    const isPasswordValidated: boolean = await bcrypt.compare(
      password,
      hashedPassword,
    );

    if (!isPasswordValidated) {
      throw new Error('system.error.differentPassword');
    }

    const payload = { email, sub: user.id };

    const token = this.jwtService.sign(payload);
    const loginUser = {
      token,
      id,
      email,
      nickname,
    };

    return loginUser;
  }
}
