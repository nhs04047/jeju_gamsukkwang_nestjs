import { IsNotEmpty, IsString } from 'class-validator';
import { CommunityCreateDto } from './community.create.dto';
export class CommutnityNewArticleDto extends CommunityCreateDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  userNickName: string;
}
