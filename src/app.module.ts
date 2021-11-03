import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './post/post.module';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { AuthMiddleware } from './auth.middleware';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [PostModule, UserModule, DatabaseModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
