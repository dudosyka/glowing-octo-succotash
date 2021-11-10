import {
  BadRequestException,
  Controller,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { Rule } from '../auth/decorator/rule.decorator';
import { CheckRuleGuard } from '../auth/guard/check-rule.guard';
import { PostService } from '../post/post.service';
import { UserService } from './user.service';
import { Post as PostModel } from '../post/post.model';
import { UserSubscriptionList } from '../subscription/subscription.service';

@Controller('/u')
export class UserController {

  constructor(private readonly postService: PostService,
              private readonly userService: UserService) {}

  @Rule(1)
  @UseGuards(JwtAuthGuard, CheckRuleGuard)
  @Post('/:username')
  async profile(@Request() req, @Param('username') username: string) {
    return await this.userService.getProfile(req.user, username);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/:username/posts')
  async posts(@Param('username') username: string): Promise<PostModel[]> | never {
    return await this.userService.getPosts(username);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':username/sub/add')
  async subscribe(@Param('username') username: string, @Request() req): Promise<boolean> | never {
    return await this.userService.addSubscription(username, req.body).catch((err) => {
      if (err.status) //Check if we got HttpException throw it to client
        throw err;
      //If we get not HttpException "hide" it for client with BadRequest
      throw new BadRequestException();
    });
  }

  @UseGuards(JwtAuthGuard)
  @Post(':username/sub')
  async getSubscribes(@Param('username') username: string): Promise<UserSubscriptionList[]> | never {
    return await this.userService.getSubscriptions(username);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':username/sub/:id/remove')
  async removeSubscribe(@Param('username') username: string, @Param('id') subId:number): Promise<boolean> | never {
    return await this.userService.removeSubscription(username, subId);
  }

  @Rule(3)
  @UseGuards(JwtAuthGuard, CheckRuleGuard)
  @Post('/write')
  createPost(@Request() req) {
    return this.postService.createPost(req.user, req.body);
  }
}
