import { User } from './../../user/user.schema';
import { IsNotEmpty, IsString, Min } from 'class-validator';
import { PickType } from '@nestjs/swagger';

export class LoginRequestDto extends PickType(User, ['email'] as const) {
  @IsString()
  @IsNotEmpty()
  @Min(8)
  password: string;
}
