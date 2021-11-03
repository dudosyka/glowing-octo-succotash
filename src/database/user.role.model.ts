import { Table, Column, Model, HasOne, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { Role } from './role.model';

@Table({
  tableName: 'user_role',
  createdAt: false,
  updatedAt: false,
})
export class UserRole extends Model {
  @Column
  user_id: number

  @HasOne(() => Role)
  role: Role
  // @Column
  // auth_role_id: number
}