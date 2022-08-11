import { User } from './../user.schema';
import { PickType } from '@nestjs/swagger';

export class UserupdatetDto extends PickType(User, ['nickname'] as const) {}
