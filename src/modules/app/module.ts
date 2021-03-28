import { HttpModule, Module } from '@nestjs/common';
import { CommonModule } from 'modules/common/module';
import { DatabaseModule } from 'modules/database/module';

import { AuthController } from './controllers/AuthController';
import { OrderController } from './controllers/OrderController';
import { ProductController } from './controllers/ProductController';
import { ProfileController } from './controllers/ProfileController';
import { DeviceRepository } from './repositories/DeviceRepository';
import { OrderRepository } from './repositories/OrderRepository';
import { ProductRepository } from './repositories/ProductRepository';
import { UserRepository } from './repositories/UserRepository';
import { AuthService } from './services/AuthService';
import { OrderService } from './services/OrderService';
import { ProductService } from './services/ProductService';
import { UserService } from './services/UserService';

@Module({
  imports: [HttpModule, CommonModule, DatabaseModule],
  controllers: [AuthController, ProfileController, ProductController, OrderController],
  providers: [
    AuthService,
    UserService,
    UserRepository,
    DeviceRepository,
    ProductRepository,
    ProductService,
    OrderRepository,
    OrderService
  ]
})
export class AppModule {}
