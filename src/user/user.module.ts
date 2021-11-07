import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.model';
import { UserController } from './user.controller';
import { PassportModule } from '@nestjs/passport';
import { CryptUtil } from '../crypt.util';
import { PostModule } from '../post/post.module';

@Module({
  imports: [
    SequelizeModule.forFeature([User]),
    PassportModule,
    PostModule
  ],
  providers: [UserService, CryptUtil],
  exports: [UserService],
  controllers: [UserController]
})
export class UserModule {}
