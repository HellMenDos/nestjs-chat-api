import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entity/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }


  createUser(user:User): Promise<User> {
    return this.usersRepository.save(user);
  }

  findUser(email:string, password?:string): Promise<User> {
    if (password == null) {
      return this.usersRepository.findOne({ where: { email: email } });
    }else {
      return this.usersRepository.findOne({ where: { email: email, password: password } });
    }
    
  }

  findOne(id: string): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}