import { LoginRequestDto } from './dto/login.request.dto';
import { UserRepository } from './../user/user.repository';
import { RegisterRequestDto } from './dto/register.request.dto';
import { Injectable, HttpException } from '@nestjs/common';
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
      throw new HttpException('system.error.duplicatedEmail', 400);
    }

    const isNicknameExist = await this.userRepository.existByNickname(nickname);
    if (isNicknameExist) {
      throw new HttpException('system.error.duplicatedNickname', 400);
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
      throw new HttpException('system.error.noUser', 401);
    }

    const { id, nickname, hashedPassword } = user;

    const isPasswordValidated: boolean = await bcrypt.compare(
      password,
      hashedPassword,
    );

    if (!isPasswordValidated) {
      throw new HttpException('system.error.differentPassword', 401);
    }

    const payload = { email, sub: id };

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
