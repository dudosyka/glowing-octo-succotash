import { Table, Column, Model } from 'sequelize-typescript'

@Table({
  tableName: 'post_category',
  createdAt: false,
  updatedAt: false,
})
export class PostCategory extends Model {
  @Column
  post_id: number

  @Column
  category_id: number
}
