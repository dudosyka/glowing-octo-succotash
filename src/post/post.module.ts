import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Post } from './post.model';
import { UserPost } from './user-post.model';
import { SubscriptionModule } from '../subscription/subscription.module';
import { CategoryModule } from '../category/category.module';

@Module({
  imports: [
    SubscriptionModule,
    CategoryModule,
    SequelizeModule.forFeature([Post, UserPost])
  ],
  providers: [PostService],
  exports: [PostService]
})
export class PostModule {}
