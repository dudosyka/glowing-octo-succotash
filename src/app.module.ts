import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PassportModule } from '@nestjs/passport';
import { DatabaseModule } from './database/database.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { MailModule } from './mail/mail.module';
import { CategoryModule } from './category/category.module';
import { PostModule } from './post/post.module';

@Module({
  imports: [AuthModule, UserModule, PassportModule, DatabaseModule, SubscriptionModule, MailModule, CategoryModule, PostModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
