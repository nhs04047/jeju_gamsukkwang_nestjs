import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';

@Controller('community')
export class CommunityController {
  @Post()
  addArticle() {
    return 'pass';
  }

  @Post('image')
  addImage() {
    return 'pass';
  }

  @Patch()
  setArticle() {
    return 'pass';
  }

  @Get(':articleId')
  getArticle() {
    return 'pass';
  }

  @Get()
  getAllArticle() {
    return 'pass';
  }

  @Delete(':id')
  deleteArticle() {
    return 'pass';
  }

  @Patch(':id/onLike')
  addLike() {
    return 'pass';
  }

  @Patch(':id/disLike')
  removeLike() {
    return 'pass';
  }
}
