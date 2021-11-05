import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { CryptUtil } from '../crypt.util';
import { InjectModel } from '@nestjs/sequelize';
import { UserRole } from './model/user.role.model';
import { Role } from './model/role.model';
import { Rule } from './model/rule.model';
import { AuthAssignments } from './model/auth.assignments.model';
import { User } from '../user/user.model';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UserService,
              private readonly jwtService: JwtService,
              @InjectModel(UserRole) private userRoleModel: typeof UserRole) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const crypt = new CryptUtil();
    const user = await this.usersService.findByLogin(username);
    const compare = await crypt.compare(pass, user.password);
    if (user && compare) {
      const { password, ...result } = user;
      return { ...result, rules: await this.getRules(user.id) };
    }
    return null;
  }

  async login(user: any) {
    console.log(user);
    const payload = { sub: user.id, rules: user.rules };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async getRules(userId: number): Promise<any> {
    return this.userRoleModel.findAll({
      include: [
        {
          model: Role,
          include: [
            {
              model: AuthAssignments,
              include: [ Rule ]
            }
          ]
        }
      ],
      where: {
        user_id: userId
      }
    }).then(userRoles => {
      const rules = [];
      userRoles.map(userRole => userRole.role.assignments.map(assignment => rules.push(assignment.rule.id)) );
      return rules;
    })
  }

  async issueRole(user: User, role: number): Promise<boolean> {
    return (await this.userRoleModel.create({user_id: user.id, auth_role_id: role})) !== null;
  }
}


