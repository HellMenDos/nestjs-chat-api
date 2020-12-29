import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from '../service/users.service';
import { MessageService } from '../service/message.service';
import { AdminUserController,AdminMessageController,AdminController } from './admin.controller';
import { User } from '../../entity/user.entity';
import { Message } from '../../entity/message.entity';
import { AppGateway } from './app.gateway';

import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
  imports: [
  TypeOrmModule.forFeature([User,Message]),
  ],
  providers: [
  UsersService,
  MessageService,
  AppGateway
  ],
  controllers: [
  AdminUserController,
  AdminMessageController,
  AdminController
  ],
})
export class AdminModule {}