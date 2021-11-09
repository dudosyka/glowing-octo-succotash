import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.model';
import { UserController } from './user.controller';
import { PassportModule } from '@nestjs/passport';
import { CryptUtil } from '../utils/crypt.util';
import { PostModule } from '../post/post.module';
import { SubscriptionModule } from '../subscription/subscription.module';

@Module({
  imports: [
    SequelizeModule.forFeature([User]),
    PassportModule,
    PostModule,
    SubscriptionModule
  ],
  providers: [UserService, CryptUtil],
  exports: [UserService],
  controllers: [UserController]
})
export class UserModule {}
