import {
SubscribeMessage,
WebSocketGateway,
OnGatewayInit,
WebSocketServer,
OnGatewayConnection,
OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { UsersService } from '../service/users.service';
import { MessageService } from '../service/message.service';

@WebSocketGateway()
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  
  
  @WebSocketServer() 
  server: Server;

  constructor(
    private serviceUser: UsersService,
    private serviceMessage:MessageService
    ) {}


  private logger: Logger = new Logger('AppGateway');

  /*
    login hendler 
  */
  @SubscribeMessage('login')
  handlelogin(client: Socket, payload) {
      this.serviceUser.findUser(payload.email,payload.password).then((d)=> { 
        if(d == undefined) {
          this.server.emit(payload.token, {'error':'Email or password is incorrect'}); 
        }else {
          this.server.emit(payload.token, d); 
        }     
       })  
  }

  /*
    registr hendler 
  */
  @SubscribeMessage('registr')
  handleregistr(client: Socket, payload) {
      this.serviceUser.findUser(payload.email).then((d)=> { 
        if(d == undefined) {
          this.serviceUser.createUser(payload).then((us)=> {
            this.server.emit(payload.token, us); 
          })
        }else {
          this.server.emit(payload.token, {'error':'This user is in system'}); 
        }     
       })  
  }

  /*
    message transfer hendler 
  */
  @SubscribeMessage('message')
  handleMessage(client: Socket, payload) {
    this.serviceMessage.createMessage(payload)
    this.server.emit('MessageClient', payload); 
  }


  afterInit(server: Server) {
    this.logger.log('Init');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.serviceMessage.findAll().then((message)=> {
        this.server.emit('connections', message); 
    })
  }
}