import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { User } from '../../user/user.model';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(username: string, pass: string): Promise<User> {
    const user = await this.authService.validateUser(username, pass);
    if (!user) {
      throw new UnauthorizedException();
    }
    const { password, ...data } = user.dataValues;
    return { ...data, rules: user.rules };
  }
}
