import { Table, Column, Model, ForeignKey } from 'sequelize-typescript';
import { Subscription } from '../subscription/subscription.model';
import { UserPost } from '../post/user-post.model';

@Table({
  tableName: 'user',
  createdAt: false,
  updatedAt: false,
})
export class User extends Model {
  @ForeignKey(() => Subscription)
  @ForeignKey(() => UserPost)
  id: number

  @Column
  fullname: string

  @Column
  username: string

  @Column
  password: string

  @Column
  created: number
}
