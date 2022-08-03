import { RegisterCreateDto } from './../account/dto/register.create.dto';
import { User, UserDocument } from './user.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async existByEmail(email: string): Promise<any> {
    const result = await this.userModel.exists({ email });
    return result;
  }

  async existByNickname(nickname: string): Promise<any> {
    const result = await this.userModel.exists({ nickname });
    return result;
  }

  create(user: RegisterCreateDto): Promise<User> {
    return this.userModel.create(user);
  }

  findUserByEmail(email: string) {
    return this.userModel.findOne({ email });
  }
}
