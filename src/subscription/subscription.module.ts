import { Module } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Subscription } from './subscription.model';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [
    MailModule,
    SequelizeModule.forFeature([Subscription])
  ],
  providers: [SubscriptionService],
  exports: [SubscriptionService]
})
export class SubscriptionModule {}
