import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from '../service/users.service';
import { MessageService } from '../service/message.service';
import { AdminUserController,AdminMessageController } from './admin.controller';
import { User } from '../../entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
  UsersService,
  MessageService
  ],
  controllers: [
  AdminUserController,
  AdminMessageController
  ],
})
export class AdminModule {}