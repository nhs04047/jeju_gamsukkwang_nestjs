import { UserCurrentDto } from './../user/dto/user.current.dto';
import { CommunityCreateDto } from './dto/community.create.dto';
import { CommunityGetListDto } from './dto/community.getList.dto';
import { CommunityRepository } from './community.repository';
import { Injectable, HttpException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CommunityService {
  constructor(private readonly communityRepository: CommunityRepository) {}

  async addArticle(
    userId: string,
    userNickName: string,
    article: CommunityCreateDto,
  ) {
    const id = uuidv4();
    const { title, content, head } = article;

    const newArticle = {
      id,
      userId,
      userNickName,
      title,
      content,
      head,
    };
    const createdNewArticle = await this.communityRepository.create(newArticle);

    return createdNewArticle;
  }

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

  async addLike(articleId: string, userId: string) {
    const isArticleExist = await this.communityRepository.isArticleExist(
      articleId,
    );
    if (!isArticleExist) {
      throw new HttpException('system.error.noArticle', 400);
    }

    const didUserLiked = await this.communityRepository.didUserLiked(
      articleId,
      userId,
    );
    if (didUserLiked) {
      throw new HttpException('system.error.alreadyLiked', 400);
    }

    const addLikeToArticle = this.communityRepository.addLike(
      articleId,
      userId,
    );

    return addLikeToArticle;
  }

  async removeLike(articleId: string, userId: string) {
    const isArticleExist = await this.communityRepository.isArticleExist(
      articleId,
    );
    if (!isArticleExist) {
      throw new HttpException('system.error.noArticle', 400);
    }

    const didUserLiked = await this.communityRepository.didUserLiked(
      articleId,
      userId,
    );
    if (!didUserLiked) {
      throw new HttpException('system.error.noLiked', 400);
    }

    const removeLikeFromArticle = this.communityRepository.removeLike(
      articleId,
      userId,
    );
    return removeLikeFromArticle;
  }
}
