import { Table, Column, Model } from 'sequelize-typescript'

@Table({
  tableName: 'user',
  createdAt: false,
  updatedAt: false,
})
export class User extends Model {
  @Column
  fullname: string

  @Column
  username: string

  @Column
  password: string

  @Column
  created: number
}
