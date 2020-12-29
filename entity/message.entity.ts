import { Entity, Column, PrimaryGeneratedColumn,ManyToOne,JoinColumn } from 'typeorm';
import { User } from './user.entity'

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  id_user: number;


  @Column()
  message: string;

  @ManyToOne(type => User, user => user.mess)
  @JoinColumn({name: 'id_user', referencedColumnName: 'id'})
  user: User;

}