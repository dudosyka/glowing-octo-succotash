import { Table, Column, Model } from 'sequelize-typescript'

@Table({
  tableName: 'post',
  createdAt: false,
  updatedAt: false,
})
export class Post extends Model {
  @Column
  title: string

  @Column
  text: string

  @Column
  preview: string
}
