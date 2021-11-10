import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { MailService } from '../mail/mail.service';
import { Subscription } from './subscription.model';
import { User } from '../user/user.model';
import { Op } from 'sequelize';
import { CATEGORY_SUBSCRIPTION_TYPE, USER_SUBSCRIPTION_TYPE } from '../constants';
import { Post } from '../post/post.model';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class SubscriptionService {
  constructor(private readonly mailService: MailService,
              @InjectModel(Subscription) private readonly subscriptionModel: typeof Subscription,
              private databaseService: DatabaseService,) {}

  async obtain(subscription: any, subscription_type: number, initiator: Post, exclude: number): Promise<boolean> {
    await this.subscriptionModel.findAll({
      include: [User],
      where: {
        subscription: subscription.id,
        subscription_type,
        user_id: {
          [Op.not]: exclude
        },
      }
    }).then((subscribers: Subscription[]) => {
      const msgs: { user_id: number, message: string }[] = [];
      subscribers.map((subscriber: Subscription) => {
        if (subscription_type === CATEGORY_SUBSCRIPTION_TYPE) {
          msgs.push({
            user_id: subscriber.user.id,
            message: `New post at ${subscription.title} category! <a href='/p/${initiator.id}'>link</a>`
          });
        }
        else if (subscription_type === USER_SUBSCRIPTION_TYPE) {
          msgs.push({
            user_id: subscriber.user.id,
            message: `New post from ${subscription.username}! <a href='/p/${initiator.id}'>link</a>`
          })
        }
      });
      this.mailService.send(msgs);
    });
    return true;
  }

  async getSubscriptions(userId): Promise<{id: number, subscription_type: number, subscription_id: number, subscription_name: string}[]> {
    console.log();
    return await this.subscriptionModel.findAll({
      attributes: [
        'id',
        'subscription_type',
        this.databaseService.case({
          field: 'subscription_type',
          when: [
            { on: USER_SUBSCRIPTION_TYPE, replaceWithQuery: 'SELECT `id` FROM `user` WHERE `user`.`id` = `Subscription`.`subscription`' },
            { on: CATEGORY_SUBSCRIPTION_TYPE, replaceWithQuery: 'SELECT `id` FROM `category` WHERE `category`.`id` = `Subscription`.`subscription`' }
          ],
          alias: 'subscription_id'
        }),
        this.databaseService.case({
          field: 'subscription_type',
          when: [
            { on: USER_SUBSCRIPTION_TYPE, replaceWithQuery: 'SELECT `username` FROM `user` WHERE `user`.`id` = `Subscription`.`subscription`' },
            { on: CATEGORY_SUBSCRIPTION_TYPE, replaceWithQuery: 'SELECT `title` FROM `category` WHERE `category`.`id` = `Subscription`.`subscription`' }
          ],
          alias: 'subscription_name'
        })
      ],
      where: {
        user_id: userId
      },

    }).then(r => r.map( (el:any) => ({...el.dataValues}) ));
  }

  async isUserSubscribed(userId, subscription, subscription_type): Promise<boolean> {
    return (await this.subscriptionModel.findOne({ where: { user_id: userId, subscription, subscription_type } }) !== null);
  }
}
