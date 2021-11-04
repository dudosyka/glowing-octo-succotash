import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { Rule } from '../auth/decorator/rule.decorator';
import { CheckRuleGuard } from '../auth/guard/check-rule.guard';

@Controller('u')
export class UserController {

  @Rule(1)
  @UseGuards(JwtAuthGuard, CheckRuleGuard)
  @Post()
  getProfile(@Request() req) {
    return req.user;
  }
}
