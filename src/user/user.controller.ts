import { Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('u')
export class UserController {

  constructor(private userService: UserService) {
  }

  @Post(':login')
  async profile(@Param('login') login: string): Promise<any | string> {
    return ""
    // return await this.userService.findByLogin(login).then(r => r.toJSON());
  }
}
