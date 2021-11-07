import { Table, Column, Model } from 'sequelize-typescript'

@Table({
  tableName: 'user_mail',
  createdAt: false,
  updatedAt: false,
})
export class UserMail extends Model {
  @Column
  user_id: number

  @Column
  message: string
}
