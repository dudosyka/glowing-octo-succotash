import { Table, Column, Model, BelongsTo } from 'sequelize-typescript';
import { User } from '../user/user.model';
import { Post } from './post.model';

@Table({
  tableName: 'user_post',
  createdAt: false,
  updatedAt: false,
})
export class UserPost extends Model {
  @Column
  post_id: number

  @Column
  user_id: number

  @BelongsTo(() => User, 'user_id')
  user: User

  @BelongsTo(() => Post, 'post_id')
  post: Post
}
