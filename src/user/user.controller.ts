import { userPointDto } from './dto/user.point.dto';
import { UserupdatetDto } from './dto/user.update.dto';
import { UserCurrentDto } from './dto/user.current.dto';
import { JwtAuthGuard } from './../account/jwt/jwt.guard';
import { UserService } from './user.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CurrentUser } from 'src/common/decorators/user.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getCurentUser(@CurrentUser() user: UserCurrentDto) {
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  setUser(
    @CurrentUser() user: UserCurrentDto,
    @Body() toUdate: UserupdatetDto,
  ) {
    return this.userService.setUser(user.id, toUdate);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('profileImg')
  setProfileImg(@CurrentUser() user: UserCurrentDto) {
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Post('stamp')
  addStamp(
    @CurrentUser() user: UserCurrentDto,
    @Body('tourId') tourId: string,
  ) {
    return this.userService.addStamp(user.id, tourId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('exp')
  addExp(@CurrentUser() user: UserCurrentDto, @Body() data: userPointDto) {
    return this.userService.addExp(user.id, data.point);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  withdrawUser(@CurrentUser() user: UserCurrentDto) {
    return this.userService.withdrawUser(user.id);
  }
}
