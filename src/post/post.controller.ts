import { Controller, Param, Post, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { CheckRuleGuard } from '../auth/guard/check-rule.guard';
import { Rule } from '../auth/decorator/rule.decorator';
import { PostService } from './post.service';

@Controller('/p')
export class PostController {
  constructor(private readonly postService: PostService) {
  }

  @Rule(4) //Remove post rule
  @UseGuards(JwtAuthGuard, CheckRuleGuard)
  @Post('/:id/remove')
  async remove(@Param('id') postId: number, @Request() req): Promise<boolean> {
    return await this.postService.remove(req.user.id, postId);
  }
}
