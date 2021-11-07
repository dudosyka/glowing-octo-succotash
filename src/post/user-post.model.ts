import { Table, Column, Model } from 'sequelize-typescript'

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
}
