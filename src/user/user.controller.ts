import { UserCurrentDto } from './dto/user.current.dto';
import { JwtAuthGuard } from './../account/jwt/jwt.guard';
import { UserService } from './user.service';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/common/decorator.ts/user.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getCurentUser(@CurrentUser() user: UserCurrentDto) {
    return user;
  }
}
