import { Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { Literal } from 'sequelize/types/lib/utils';

export interface CaseQuery {
  on: any,
  replaceWithQuery: any
}

@Injectable()
export class DatabaseService {
  case(_case: {field: string, when: CaseQuery[], alias: string}):[Literal, string] {
    let literalQuery = "CASE ";
    _case.when.map(el => {
      literalQuery += `WHEN ${_case.field} = ${el.on} THEN (${el.replaceWithQuery}) `;
    });
    literalQuery += "END";
    return [Sequelize.literal(literalQuery), _case.alias];
  }
}
