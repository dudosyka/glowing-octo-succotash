import { Table, Column, Model, BelongsTo } from 'sequelize-typescript';
import { User } from '../user/user.model';

@Table({
  tableName: 'subscribe',
  createdAt: false,
  updatedAt: false,
})
export class Subscription extends Model {
  @Column
  subscription: number

  @BelongsTo(() => User, 'user_id')
  user: User

  @Column
  user_id: number

  @Column
  subscription_type: string
}
