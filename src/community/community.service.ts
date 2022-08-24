import { CommunityGetListDto } from './dto/community.getList.dto';
import { CommunityRepository } from './community.repository';
import { Injectable, HttpException } from '@nestjs/common';

@Injectable()
export class CommunityService {
  constructor(private readonly communityRepository: CommunityRepository) {}

  async getArticle(id: string) {
    const article = await this.communityRepository.findById(id);
    if (!article) {
      throw new HttpException('system.error.noArticle', 400);
    }
    return article;
  }

  async getArticles(getArticles: CommunityGetListDto) {
    const result = await this.communityRepository.findAll(getArticles);
    if (result.total === 0) {
      throw new HttpException('system.error.noArticles', 400);
    }
    return result;
  }

  async deleteArticle(articleId: string, userId: string) {
    const currentArticle = await this.communityRepository.findById(articleId);
    if (!currentArticle) {
      throw new HttpException('system.error.noArticle', 400);
    }

    if (userId !== currentArticle.userId) {
      throw new HttpException('system.error.noPermission', 403);
    }
    try {
      await this.communityRepository.deleteById(articleId);
      return 'system.success';
    } catch (err) {
      throw new HttpException('system.error.fail', 400);
    }
  }
}
