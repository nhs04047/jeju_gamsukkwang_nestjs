import { User } from './../../user/user.schema';
import { PickType } from '@nestjs/swagger';

export class RegisterCreateDto extends PickType(User, [
  'id',
  'email',
  'hashedPassword',
  'nickname',
] as const) {}
