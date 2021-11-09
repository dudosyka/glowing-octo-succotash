import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { Rule } from '../auth/decorator/rule.decorator';
import { CheckRuleGuard } from '../auth/guard/check-rule.guard';
import { PostService } from '../post/post.service';

@Controller('u')
export class UserController {

  constructor(private readonly postService: PostService) {}

  @Rule(1)
  @UseGuards(JwtAuthGuard, CheckRuleGuard)
  @Post()
  getProfile(@Request() req) {
    return req.user;
  }

  @Rule(3)
  @UseGuards(JwtAuthGuard, CheckRuleGuard)
  @Post('/write')
  createPost(@Request() req) {
    return this.postService.createPost(req.user, req.body);
  }


}
