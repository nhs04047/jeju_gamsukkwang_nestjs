import { Community } from './../community.schema';
import { PickType } from '@nestjs/swagger';

export class CommunityCreateDto extends PickType(Community, [
  'title',
  'content',
  'head',
] as const) {}
