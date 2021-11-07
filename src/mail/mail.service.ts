import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserMail } from './user-mail.model';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class MailService {
  constructor(@InjectModel(UserMail) private readonly userMailModel: typeof UserMail, private sequelize: Sequelize) {}

  async send(messages: { user_id: number, message: string }[]): Promise<void> {
    try {
      await this.sequelize.transaction(async t => {
        const transactionHost = { transaction: t };
        await Promise.all(messages.map(async msg => {
          await this.userMailModel.create(msg, transactionHost);
        }));
      })
    }
    catch (e) {

    }
  }
}
