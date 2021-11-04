import { Table, Column, Model, ForeignKey, HasMany } from 'sequelize-typescript';
import { UserRole } from './user.role.model';
import { AuthAssignments } from './auth.assignments.model';

@Table({
  tableName: 'auth_role',
  createdAt: false,
  updatedAt: false,
})
export class Role extends Model {
  @ForeignKey(() => UserRole)
  @ForeignKey(() => AuthAssignments)
  id: number

  @Column
  name: string

  @HasMany(() => AuthAssignments, 'auth_role_id')
  assignments: AuthAssignments[]

}
