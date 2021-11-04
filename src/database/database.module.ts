import { Global, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../user/user.model';
import { AuthAssignments } from '../auth/model/auth.assignments.model';
import { UserRole } from '../auth/model/user.role.model';
import { Role } from '../auth/model/role.model';
import { Rule } from '../auth/model/rule.model';

@Global()
@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'dudosyka',
      password: '123',
      database: 'nestBlog',
      models: [
        User,
        AuthAssignments,
        UserRole,
        Role,
        Rule
      ],
    })
  ]
})
export class DatabaseModule {}
