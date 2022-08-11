import { UserupdatetDto } from './dto/user.update.dto';
import { UserCurrentDto } from './dto/user.current.dto';
import { RegisterCreateDto } from './../account/dto/register.create.dto';
import { User, UserDocument } from './user.schema';
import { ConsoleLogger, Injectable } from '@nestjs/common';
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

  async update(id: string, toUpdate: UserupdatetDto): Promise<User> {
    const filter = { id };
    const update = { $set: toUpdate };
    const option = { returnOriginal: false };

    const updateUser = await this.userModel.findOneAndUpdate(
      filter,
      update,
      option,
    );

    return updateUser;
  }

  async findUserByIdWithoutPassword(
    userId: string,
  ): Promise<UserCurrentDto | null> {
    console.log(userId);
    const user = await this.userModel
      .findOne({ id: userId })
      .select('-hashedPassword');
    return user;
  }
}
