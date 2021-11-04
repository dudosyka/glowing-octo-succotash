import { Table, Model, ForeignKey, BelongsTo } from 'sequelize-typescript';
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

  @BelongsTo(() => Role, 'auth_role_id')
  role: Role

  @BelongsTo(() => Rule, 'auth_rule_id')
  rule: Rule
}
