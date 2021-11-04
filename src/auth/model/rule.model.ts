import { Table, Column, Model, ForeignKey } from 'sequelize-typescript';
import { AuthAssignments } from './auth.assignments.model';

@Table({
  tableName: 'auth_rule',
  createdAt: false,
  updatedAt: false,
})
export class Rule extends Model {
  @ForeignKey(() => AuthAssignments)
  id: number

  @Column
  name: string
}