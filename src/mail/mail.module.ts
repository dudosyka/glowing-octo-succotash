import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserMail } from './user-mail.model';

@Module({
  imports: [
    SequelizeModule.forFeature([UserMail])
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
