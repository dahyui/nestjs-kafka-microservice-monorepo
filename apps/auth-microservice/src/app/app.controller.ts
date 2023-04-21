import { CreateUserDto } from '@nest-js-microservices/shared/dto';
import { Controller, ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { User } from '@nest-js-microservices/shared/entities';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('create_user')
  handleCreateUser(@Payload(ValidationPipe) data: CreateUserDto): void {
    this.appService.createUser(data);
  }

  @MessagePattern('get_user')
  handleGetUser(@Payload('userId', ParseIntPipe) id: number): User {
    return this.appService.getUser(id);
  }
}
