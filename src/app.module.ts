import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { Message } from '../entity/message.entity';

import { AdminModule } from './admin/admin.module'

@Module({
  imports: [
      AdminModule,
      TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'nestjs',
      entities: [User,Message],
      synchronize: true,
    }),
  ],
  controllers: [
  ],
  providers: [
  ],
})
export class AppModule {}
