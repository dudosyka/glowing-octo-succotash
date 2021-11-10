import { Global, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../user/user.model';
import { AuthAssignments } from '../auth/model/auth.assignments.model';
import { UserRole } from '../auth/model/user.role.model';
import { Role } from '../auth/model/role.model';
import { Rule } from '../auth/model/rule.model';
import { Post } from '../post/post.model';
import { UserPost } from '../post/user-post.model';
import { PostCategory } from '../category/post-category.model';
import { Subscription } from '../subscription/subscription.model';
import { UserMail } from '../mail/user-mail.model';
import { Category } from '../category/category.model';
import { DatabaseService } from './database.service';

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
        Rule,
        Post,
        UserPost,
        Category,
        PostCategory,
        Subscription,
        UserMail
      ],
    })
  ],
  providers: [DatabaseService],
  exports: [DatabaseService]
})
export class DatabaseModule {}
