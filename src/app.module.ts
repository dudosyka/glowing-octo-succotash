import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PassportModule } from '@nestjs/passport';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [AuthModule, UserModule, PassportModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
