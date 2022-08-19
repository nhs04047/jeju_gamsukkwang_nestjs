import { userPointDto } from './dto/user.point.dto';
import { UserupdatetDto } from './dto/user.update.dto';
import { UserCurrentDto } from './dto/user.current.dto';
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

  async findById(id: string): Promise<User> {
    return this.userModel.findOne({ id });
  }

  async updateExp(id: string, point: number): Promise<User> {
    const filter = { id };
    const update = { $inc: { experience: point } };
    const option = { returnOriginal: false };

    return this.userModel.findOneAndUpdate(filter, update, option);
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

  async addStamp(userId: string, tourId: string): Promise<User> {
    const filter = { id: userId };
    const update = {
      $push: { stamp: tourId },
    };
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
    const user = await this.userModel
      .findOne({ id: userId })
      .select('-hashedPassword');
    return user;
  }
}
