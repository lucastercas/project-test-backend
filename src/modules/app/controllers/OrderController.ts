import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthRequired, CurrentUser } from 'modules/common/guards/token';
import { ICurrentUser } from 'modules/common/interfaces/currentUser';
import { Order } from 'modules/database/models/Order';
import { OrderRepository } from '../repositories/OrderRepository';
import { OrderService } from '../services/OrderService';
import { OrderSaveValidator } from '../validators/order/OrderSaveValidator';

@ApiTags('App: Order')
@Controller('/order')
@AuthRequired()
export class OrderController {
  constructor(private orderRepository: OrderRepository, private orderService: OrderService) {}

  @Get()
  @ApiResponse({ status: 200 })
  public async list(@CurrentUser() currentUser: ICurrentUser) {
    return this.orderService.list(currentUser);
  }

  @Get(':orderId')
  @ApiResponse({ status: 200, type: Order })
  public async findById(@Param('orderId', ParseIntPipe) orderId: number, @CurrentUser() currentUser: ICurrentUser) {
    console.log('Finding order ', orderId);
    return this.orderRepository.findById(orderId, currentUser);
  }

  @Delete(':orderId')
  public async remove(@Param('orderId', ParseIntPipe) orderId: number, @CurrentUser() currentUser: ICurrentUser) {
    return this.orderService.remove(orderId, currentUser);
  }

  @Post()
  public async create(@Body() model: OrderSaveValidator, @CurrentUser() currentUser: ICurrentUser) {
    return this.orderService.save(model, currentUser);
  }
}
