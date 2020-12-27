import { Controller, Get,Body,Post,Param } from '@nestjs/common';
import { UsersService } from '../service/users.service';
import { MessageService } from '../service/message.service';
import { User } from '../../entity/user.entity';
import { Message } from '../../entity/message.entity';


@Controller('admin/user/')
export class AdminUserController {
  
  constructor(private service: UsersService) {}

  @Post('insert')
  insertUser(@Body() user: User) {
   return this.service.createUser(user);   
  }

  @Get('select')
  selectall() {
   return this.service.findAll();   
  }

  @Get('selectOne')
  selectone(@Param('id') id) {
   return this.service.findOne(id);   
  }

  @Get('delete/:id')
  delete(@Param('id') id) {
   return this.service.remove(id);   
  }


}


@Controller('admin/message/')
export class AdminMessageController {
  
  constructor(private service: MessageService) {}

  @Post('insert')
  insertUser(@Body() message: Message) {
   return this.service.createMessage(message);   
  }

  @Get('select')
  selectall() {
   return this.service.findAll();   
  }


}
