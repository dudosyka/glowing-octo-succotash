import { Table, Column, Model, HasMany, HasOne, ForeignKey } from 'sequelize-typescript';
import { Role } from './role.model';
import { Rule } from './rule.model';

@Table({
  tableName: 'auth_assignment',
  createdAt: false,
  updatedAt: false,
})
export class AuthAssignments extends Model {
  @ForeignKey(() => Role)
  id: number

  @HasOne(() => Role)
  parent: Role

  @HasOne(() => Rule)
  child: Rule
}