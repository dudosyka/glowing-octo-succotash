import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { Error, ValidateUtil } from '../validate.util';
import { CryptUtil } from '../crypt.util';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userModel: typeof User, private crypt: CryptUtil) {}

  async findOne(id: number) {
    return this.userModel.findOne({
      attributes: {
        exclude: ['password']
      },
      where: {
        id
      }
    })
  }

  async findByLogin(username: string): Promise<User | null> {
    return this.userModel.findOne({
      where: {
        username
      }
    })
  }

  async createUser(user: any): Promise<Error[] | User> {
    const errs:Error[] = [];
    const validator = new ValidateUtil(user);

    const checkLoginLength = validator.checkLength(3, 32, 'username');
    if (checkLoginLength !== true)
      errs.push(checkLoginLength);

    const checkPasswordLength = validator.checkLength(8, 100, 'password');
    if (checkPasswordLength !== true)
      errs.push(checkPasswordLength);

    const checkUniqueLogin = await this.findByLogin(user.username);
    if (checkUniqueLogin)
      errs.push({err: true, type: 'unique', item: 'username'});

    if (errs.length)
      return errs;

    user.created = Date.now();
    user.password = await this.crypt.crypt(user.password);
    return await this.userModel.create(user);
  }
}
