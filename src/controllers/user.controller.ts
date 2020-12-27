import { Controller, Get } from '@nestjs/common';

@Controller('users')
export class UserController {
  constructor() {}

  @Get()
  getHefdgllo(): string {
   return 'fdfd3f';   
  }
}
