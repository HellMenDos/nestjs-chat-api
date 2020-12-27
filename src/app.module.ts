import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';

import { UserController } from './controllers/user.controller'

@Module({
  imports: [
      TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'laravelpr',
      entities: [User],
      synchronize: true,
    }),
  ],
  controllers: [
  UserController
  ],
  providers: [],
})
export class AppModule {}
