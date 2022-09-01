import { CommutnityNewArticleDto } from './dto/community.newArticle.dto';
import { CommunityGetListDto } from './dto/community.getList.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Community, CommunityDocument } from './community.schema';

export class CommunityRepository {
  constructor(
    @InjectModel(Community.name)
    private communityModule: Model<CommunityDocument>,
  ) {}

  create(newArticle: CommutnityNewArticleDto) {
    return this.communityModule.create(newArticle);
  }

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

  deleteById(id: string) {
    this.communityModule.deleteOne({ id });
  }

  isArticleExist(id: string) {
    return this.communityModule.exists({ id });
  }

  async didUserLiked(articleId: string, userId: string) {
    const didUserLiked = await this.communityModule.exists({
      $and: [{ id: articleId }, { likedUsers: userId }],
    });
    return didUserLiked;
  }

  async addLike(articleId: string, userId: string) {
    const filter = { id: articleId };
    const update = {
      $push: { likedUsers: userId },
    };
    const option = { returnOriginal: false };

    const result = await this.communityModule.findOneAndUpdate(
      filter,
      update,
      option,
    );

    return result;
  }

  async removeLike(articleId: string, userId: string) {
    const filter = { id: articleId };
    const update = {
      $pull: { likedUsers: userId },
    };
    const option = { returnOriginal: false };

    const result = await this.communityModule.findOneAndUpdate(
      filter,
      update,
      option,
    );

    return result;
  }
}
