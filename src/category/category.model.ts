import { Table, Column, Model } from 'sequelize-typescript'

@Table({
  tableName: 'category',
  createdAt: false,
  updatedAt: false,
})
export class Category extends Model {
  @Column
  title: string
}
