import { LoginRequestDto } from './dto/login.request.dto';
import { AccountService } from './account.service';
import { RegisterRequestDto } from './dto/register.request.dto';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('account')
export class AccountController {
  constructor(private readonly accountSevice: AccountService) {}

  @Post('register')
  signUp(@Body() body: RegisterRequestDto) {
    return this.accountSevice.singUp(body);
  }

  @Post('login')
  login(@Body() body: LoginRequestDto) {
    return this.accountSevice.login(body);
  }
}
