import { User } from './../user.schema';
import { OmitType } from '@nestjs/swagger';

export class UserCurrentDto extends OmitType(User, [
  'hashedPassword',
] as const) {}
