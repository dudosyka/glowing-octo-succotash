import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Post } from './post.model';
import { UserPost } from './user-post.model';
import { SubscriptionService } from '../subscription/subscription.service';
import { Observable } from 'rxjs';
import { CategoryService } from '../category/category.service';
import { CATEGORY_SUBSCRIPTION_TYPE, USER_SUBSCRIPTION_TYPE } from '../constants';
import { User } from '../user/user.model';

@Injectable()
export class PostService {

  constructor(@InjectModel(Post) private readonly postModel: typeof Post,
              @InjectModel(UserPost) private readonly userPostModel: typeof UserPost,
              private readonly categoryService: CategoryService,
              private readonly subscriptionService: SubscriptionService) {}

  createPost(user: User, data): Observable<any> {
    return new Observable(subscriber => {
      const category = data.category ?? false;
      delete data.category;
      this.postModel.create(data).then(async createdPost => {
        await this.userPostModel.create({post_id: createdPost.id, user_id: user.id}).then(() => {
          subscriber.next(this.subscriptionService.obtain(user, USER_SUBSCRIPTION_TYPE, createdPost, user.id));
        });
        if (category !== false)
         await this.categoryService.append(createdPost, category).then(async createdRelation => {
            const category = (await this.categoryService.get(createdRelation.category_id));
            subscriber.next(this.subscriptionService.obtain(category, CATEGORY_SUBSCRIPTION_TYPE, createdPost, user.id));
          })
        subscriber.complete();
      });
    });
  }

  async getLastFromUser(userId: number, num: number = 3): Promise<Post[]> {
    return await this.userPostModel.findAll({
      where: {
        user_id: userId
      },
      include: [Post],
      limit: num,
      order: [
        ['id', 'DESC']
      ]
    }).then(r => r.map(el => el.post));
  }

  async remove(userId: number, postId: number): Promise<boolean> {
    const userPost = await this.userPostModel.findOne({
      where: {
        user_id: userId,
        post_id: postId
      }
    });
    console.log(userPost);
    if (!userPost)
      throw new NotFoundException();

    await this.postModel.destroy({
      where: {
        id: postId
      }
    });

    return true;
  }

  async getUserPosts(userId: number): Promise<Post[]> {
    return await this.userPostModel.findAll({
      include: [Post],
      where: {
        user_id: userId
      },
      order: [
        ['id', 'DESC'],
      ]
    }).then(r => r.map(el => el.post));
  }
}
