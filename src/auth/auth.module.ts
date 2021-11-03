import { Global, Injectable, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthAssignments } from '../database/auth.assignments.model';
import { UserRole } from '../database/user.role.model';
import { AuthService } from './auth.service';
import { User } from '../database/user.model';
import { Role } from '../database/role.model';

@Module({
  imports: [
    SequelizeModule.forFeature([User, AuthAssignments, UserRole, Role])
  ],
  providers: [Number, AuthService],
})
export class AuthModule {}
