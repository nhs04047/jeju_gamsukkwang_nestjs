import { CommunityGetListDto } from './dto/community.getList.dto';
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

  async findAll(getArticles: CommunityGetListDto) {
    const { page, limit, head } = getArticles;

    const headTriger = head !== '' ? { head } : null;
    const total = await this.communityModule.countDocuments(headTriger);

    const offset = (page - 1) * limit;
    const totalPage = Math.ceil(total / limit);

    const articles = await this.communityModule
      .find(headTriger)
      .limit(limit)
      .skip(offset)
      .sort({ createdAt: -1 });

    const sendArticles = {
      total,
      totalPage,
      articles,
    };

    return sendArticles;
  }
}
