import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import {exec} from 'child_process';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
}
