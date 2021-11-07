import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/guard/local-auth.guard';
import { GuestGuard } from './auth/guard/guest.guard';
import { UserService } from './user/user.service';
import { User } from './user/user.model';
import { Error } from './validate.util';
import { COMMON_USER } from './constants';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService, private readonly userService: UserService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(GuestGuard)
  @Post('auth/signup')
  async signUp(@Request() req) {
    const r:Error[]|User = await this.userService.createUser(req.body);
    if (Array.isArray(r))
      return r;

    const issue = await this.authService.issueRole(r, COMMON_USER);
    if (issue)
      return {success: true}
    else {
      await r.destroy();
      return {err: true, type: "server"}
    }

  }
}
