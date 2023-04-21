import { CreateUserDto } from '@nest-js-microservices/shared/dto';
import { User } from '@nest-js-microservices/shared/entities';
import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';

@Injectable()
export class AppService {
  constructor(private readonly usersRepository: UsersRepository) {}

  createUser(data: CreateUserDto): void {
    console.log('Creating user:', data);
    this.usersRepository.save(data);
  }

  getUser(id: number): User {
    return this.usersRepository.findOne(id);
  }
}
