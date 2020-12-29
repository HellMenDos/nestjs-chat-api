import { Controller, Get,Body,Post,Param,Render,Res } from '@nestjs/common';
import { UsersService } from '../service/users.service';
import { MessageService } from '../service/message.service';
import { User } from '../../entity/user.entity';
import { Message } from '../../entity/message.entity';

/*
  Admin api for users 
*/
@Controller('admin/user/')
export class AdminUserController {
  
  constructor(private service: UsersService) {}

  @Post('insert')
  insertUser(@Res() res,@Body() user: User) {
    this.service.createUser(user);  
    return res.status(302).redirect('/admin/login'); 
  }

  @Post('getuser')
  getUser(@Body() user: User) {
    return this.service.findUser(user.email,user.password); 
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
  delete(@Res() res,@Param('id') id) {
    this.service.remove(id);   
    return res.status(302).redirect('/admin/login');
  }



}
/*
  Admin api for message
*/
@Controller('admin/message/')
export class AdminMessageController {
  
  constructor(private service: MessageService) {}

  @Post('insert')
  insertUser(@Res() res,@Body() message: Message) {
   this.service.createMessage(message);
   return res.status(302).redirect('/admin/login');
  }

  @Get('select')
  selectall() {
   return this.service.findAll();   
  }

  @Get('delete/:id')
  delete(@Res() res,@Param('id') id) {
    this.service.remove(id);   
    return res.status(302).redirect('/admin/login');
  }


}

/*
  Admin views with settings 
  for users and messages 
*/
@Controller('admin/login')
export class AdminController {
  
  allusers = []
  allMessages = []

  constructor(
    private serviceUser: UsersService,
    private serviceMessage: MessageService
    ) {
  }


  @Get()
  @Render('index.hbs')
  async comeOn() {
    this.allusers = await this.serviceUser.findAll();
    this.allMessages = await this.serviceMessage.findAll(); 
    return {
      users: this.allusers,
      message: this.allMessages
     }
  }


}
