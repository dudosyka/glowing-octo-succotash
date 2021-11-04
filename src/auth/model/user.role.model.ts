import { Table, Column, Model, BelongsTo } from 'sequelize-typescript';
import { Role } from './role.model';

@Table({
  tableName: 'user_role',
  createdAt: false,
  updatedAt: false,
})
export class UserRole extends Model {
  @Column
  user_id: number

  @BelongsTo(() => Role, 'auth_role_id')
  role: Role
  // @Column
  // auth_role_id: number
}
