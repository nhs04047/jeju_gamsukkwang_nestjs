import { CommunityCreateDto } from './dto/community.create.dto';
import { CommunityGetListDto } from './dto/community.getList.dto';
import { CommunityService } from './community.service';
import { UserCurrentDto } from './../user/dto/user.current.dto';
import { JwtAuthGuard } from './../account/jwt/jwt.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CurrentUser } from 'src/common/decorators/user.decorator';

@Controller('community')
export class CommunityController {
  constructor(private readonly communityService: CommunityService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  addArticle(
    @CurrentUser() user: UserCurrentDto,
    @Body() article: CommunityCreateDto,
  ) {
    return this.communityService.addArticle(user.id, user.nickname, article);
  }

  @Post('image')
  addImage() {
    return 'pass';
  }

  @Patch()
  setArticle() {
    return 'pass';
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getArticle(@Param('id') id: string) {
    return this.communityService.getArticle(id);
  }

  // 전체 혹은 모든 말머리 게시글 정보 불러오기
  // total: 전체 혹은 모든 말머리 게시글 갯수
  // totalPage: 전체 혹은 모든 말머리 페이지 갯수
  // articles: 실제 게시글 정보
  @Get()
  getAllArticle(@Query() { page, limit, head }: CommunityGetListDto) {
    console.log(page, limit, head);
    return this.communityService.getArticles({ page, limit, head });
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteArticle(
    @CurrentUser() user: UserCurrentDto,
    @Param('id') articleId: string,
  ) {
    return this.communityService.deleteArticle(articleId, user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/onLike')
  addLike(@CurrentUser() user: UserCurrentDto, @Param('id') articleId: string) {
    return this.communityService.addLike(articleId, user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/disLike')
  removeLike(
    @CurrentUser() user: UserCurrentDto,
    @Param('id') articleId: string,
  ) {
    return this.communityService.removeLike(articleId, user.id);
  }
}
