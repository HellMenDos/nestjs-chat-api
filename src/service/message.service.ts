import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from '../../entity/message.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private MessageRepository: Repository<Message>,
  ) {}

  findAll(): Promise<Message[]> {
    return this.MessageRepository.find({ relations: ["user"] });
  }

  createMessage(message:Message): Promise<Message> {
    return this.MessageRepository.save(message);
  }

  async remove(id: string): Promise<void> {
    await this.MessageRepository.delete(id);
  }

}