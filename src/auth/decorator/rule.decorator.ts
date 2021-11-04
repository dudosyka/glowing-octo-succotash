import { SetMetadata } from '@nestjs/common';

export const Rule = (rule_id: number) => SetMetadata('auth_required_rule', rule_id);
