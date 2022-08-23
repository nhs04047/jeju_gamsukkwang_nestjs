import { CommunityRepository } from './community.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommunityService {
  constructor(private readonly communityRepository: CommunityRepository) {}

  getArticle(id: string) {
    return this.communityRepository.findById(id);
  }
}
