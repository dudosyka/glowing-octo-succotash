import { Controller, Param, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { Rule } from '../auth/decorator/rule.decorator';
import { CheckRuleGuard } from '../auth/guard/check-rule.guard';
import { PostService } from '../post/post.service';
import { UserService } from './user.service';
import { Post as PostModel } from '../post/post.model';

@Controller('/u')
export class UserController {

  constructor(private readonly postService: PostService,
              private readonly userService: UserService) {}

  @Rule(1)
  @UseGuards(JwtAuthGuard, CheckRuleGuard)
  @Post('/:username')
  async getProfile(@Request() req, @Param('username') username: string) {
    return await this.userService.getProfile(req.user, username);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/:username/posts')
  async userPosts(@Request() req, @Param('username') username: string): Promise<PostModel[]> {
    return await this.userService.getPosts(username);
  }

  @Rule(3)
  @UseGuards(JwtAuthGuard, CheckRuleGuard)
  @Post('/write')
  createPost(@Request() req) {
    return this.postService.createPost(req.user, req.body);
  }
}
