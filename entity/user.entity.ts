import { Entity, Column, PrimaryGeneratedColumn,OneToMany } from 'typeorm';
import { Message } from './message.entity'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(type => Message, Message => Message.user)
  mess: Message[];
}