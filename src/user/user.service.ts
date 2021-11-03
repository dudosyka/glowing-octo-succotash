import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../database/user.model';

@Injectable()
export class UserService {

  constructor(@InjectModel(User) private userModel: typeof User) {
    // this.user = [
    //   {
    //     userId: 1,
    //     username: 'john',
    //     password: 'changeme',
    //   },
    //   {
    //     userId: 2,
    //     username: 'chris',
    //     password: 'secret',
    //   },
    //   {
    //     userId: 3,
    //     username: 'maria',
    //     password: 'guess',
    //   },
    // ];
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.userModel.findOne({where: {
        username
      }})
  }
}
