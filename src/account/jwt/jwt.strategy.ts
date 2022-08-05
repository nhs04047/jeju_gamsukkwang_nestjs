import { Payload } from './jwt.payload';
import { UserRepository } from './../../user/user.repository';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userRepository: UserRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
      ignoreExpiration: false,
    });
  }
  async validate(payload: Payload) {
    const user = await this.userRepository.findUserByIdWithoutPassword(
      payload.sub,
    );
    console.log(user);
    if (!user) {
      throw new Error('system.error.unvalidToken');
    }

    return user;
  }
}
