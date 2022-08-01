import { PickType } from '@nestjs/swagger';
import { User } from './../../user/user.schema';
import { IsNotEmpty, IsString, Min } from 'class-validator';

export class RegisterRequestDto extends PickType(User, [
  'email',
  'nickname',
] as const) {
  @IsString()
  @IsNotEmpty()
  @Min(8)
  password: string;
}
