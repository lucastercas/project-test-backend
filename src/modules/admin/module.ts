import { HttpModule, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CommonModule } from 'modules/common/module';
import { DatabaseModule } from 'modules/database/module';

import { AuthController } from './controllers/AuthController';
import { TestController } from './controllers/test';
import { UserController } from './controllers/UserController';
import { RenewTokenMiddleware } from './middlewares/renewToken';
import { UserRepository } from './repositories/UserRepository';
import { AuthService } from './services/AuthService';
import { UserService } from './services/UserService';

@Module({
  imports: [HttpModule, CommonModule, DatabaseModule],
  controllers: [AuthController, UserController, TestController],
  providers: [AuthService, UserRepository, UserService]
})
export class AdminModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(RenewTokenMiddleware).forRoutes('*');
  }
}
