import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { Error, ValidateUtil } from '../utils/validate.util';
import { CryptUtil } from '../utils/crypt.util';
import { PostService } from '../post/post.service';
import { SubscriptionService } from '../subscription/subscription.service';
import { USER_SUBSCRIPTION_TYPE } from '../constants';
import { Post } from '../post/post.model';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userModel: typeof User, private crypt: CryptUtil,
              private readonly postService: PostService,
              private readonly subscriptionService: SubscriptionService) {}

  async findOne(id: number) {
    return this.userModel.findByPk(id);
  }

  async findByLogin(username: string, excludePass: boolean = false): Promise<User | null> {
    const exclude: string[] = excludePass ? ['password'] : [];
    return this.userModel.findOne({
      where: {
        username
      },
      attributes: {
        exclude
      }
    })
  }

  async createUser(user: any): Promise<Error[] | User> {
    const errs:Error[] = [];
    const validator = new ValidateUtil(user);

    const checkLoginLength = validator.checkLength(3, 32, 'username');
    if (checkLoginLength !== true)
      errs.push(checkLoginLength);

    const checkPasswordLength = validator.checkLength(8, 100, 'password');
    if (checkPasswordLength !== true)
      errs.push(checkPasswordLength);

    const checkUniqueLogin = await this.findByLogin(user.username);
    if (checkUniqueLogin)
      errs.push({err: true, type: 'unique', item: 'username'});

    if (errs.length)
      return errs;

    user.created = Date.now();
    user.password = await this.crypt.crypt(user.password);
    return await this.userModel.create(user);
  }

  async getProfile(viewer: User, username: string) {
    const profileData: User = await this.findByLogin(username, true);
    const isSubscribed: boolean = await this.subscriptionService.isUserSubscribed(viewer.id, profileData.id, USER_SUBSCRIPTION_TYPE);
    const lastPosts: Post[] = await this.postService.getLastFromUser(profileData.id);
    const clearData: any = {...profileData}
    return {
      ...clearData.dataValues,
      isSubscribed,
      lastPosts
    }
  }

  async getPosts(target: string): Promise<Post[]> {
    const targetUser = await this.findByLogin(target);
    return await this.postService.getUserPosts(targetUser.id);
  }

  async getSubscriptions(username: string): Promise<any[]> {
    const target = await this.findByLogin(username);
    return await this.subscriptionService.getSubscriptions(target.id);
  }
}
