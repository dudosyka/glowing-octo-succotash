import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { LocalStrategy } from './strategy/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { jwtConstants } from './constants';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserRole } from './model/user.role.model';
import { Role } from './model/role.model';
import { Rule } from './model/rule.model';
import { AuthAssignments } from './model/auth.assignments.model';

@Module({
  imports: [
    UserModule,
    PassportModule,
    SequelizeModule.forFeature([
      UserRole,
      Role,
      Rule,
      AuthAssignments
    ]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    })
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
