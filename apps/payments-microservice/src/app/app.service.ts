import { MakePaymentDto } from '@nest-js-microservices/shared/dto';
import { User } from '@nest-js-microservices/shared/entities';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    @Inject('AUTH_MICROSERVICE') private readonly authClient: ClientKafka
  ) {}

  processPayment(makePaymentDto: MakePaymentDto) {
    const { userId } = makePaymentDto;
    this.authClient
      .send('get_user', JSON.stringify({ userId }))
      .subscribe((user: User) => {
        console.log(
          'process payment for user', user
        );
      });
  }

  onModuleInit() {
    this.authClient.subscribeToResponseOf('get_user');
  }
}
