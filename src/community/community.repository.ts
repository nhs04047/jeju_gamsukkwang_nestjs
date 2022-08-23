import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Community, CommunityDocument } from './community.schema';

export class CommunityRepository {
  constructor(
    @InjectModel(Community.name)
    private communityModule: Model<CommunityDocument>,
  ) {}

  findById(id: string) {
    return this.communityModule.findOne({ id });
  }
}
