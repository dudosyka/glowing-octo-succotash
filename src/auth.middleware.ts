import { Inject, Injectable, Module, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { AuthAssignments } from './database/auth.assignments.model';
import { UserRole } from './database/user.role.model';

@Injectable()
@Module({
  imports: [AuthModule],
})
export class AuthMiddleware implements NestMiddleware {
  private authService: AuthService;
  use(req: Request, res: Response, next: () => void) {
    this.authService = new AuthService(1, AuthAssignments, UserRole);
    this.authService.hasAccess();
    if (res.header('Authorization')) {
      next();
    }
  }
}
