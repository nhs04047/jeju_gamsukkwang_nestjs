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
}
