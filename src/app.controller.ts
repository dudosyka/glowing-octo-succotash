import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/guard/local-auth.guard';
import { CryptUtil } from './crypt.util';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Get()
  async pass() {
    const cryptUtil = new CryptUtil();
    return await cryptUtil.crypt('changeme');
  }
}
