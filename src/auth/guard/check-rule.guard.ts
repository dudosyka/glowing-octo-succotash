import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class CheckRuleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext) {
    const requiredRule = this.reflector.getAllAndOverride<boolean>('auth_required_rule', [
      context.getHandler(),
      context.getClass(),
    ]);
    const authorizedUser = context.switchToHttp().getRequest().user;
    return authorizedUser.rules.includes(requiredRule);
  }
}
