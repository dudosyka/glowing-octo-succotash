import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('u')
export class UserController {

  @UseGuards(AuthGuard('jwt'))
  @Post()
  getProfile(@Request() req) {
    return req.user;
  }
}
