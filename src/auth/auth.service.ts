import {Injectable} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AuthAssignments } from '../database/auth.assignments.model';
import { UserRole } from '../database/user.role.model';
import { Role } from '../database/role.model';
import { Rule } from 'src/database/rule.model';

@Injectable()
export class AuthService {
  constructor(private userId: number, @InjectModel(AuthAssignments) private authAssignmentsModel: typeof AuthAssignments, @InjectModel(UserRole) private userRoleModel: typeof UserRole) {}

  private async getAccessible(): Promise<void> {
    return this.userRoleModel.findAll({
      include: [
        { model: Role, include: [{ model: AuthAssignments, include: [Rule] }]  },
      ],
      where: {
        user_id: this.userId
      }
    }).then(r => {
      // r.map(userRole => {
      //   userRole.role.assignments.map(assignment => {
      //     console.log(assignment.child.name);
      //   });
      // });
    }).catch(err => {
      console.log("err", err);
    });
  }

  public hasAccess(): boolean {
    this.getAccessible().then(r => {

    });
    return true;
  }
}