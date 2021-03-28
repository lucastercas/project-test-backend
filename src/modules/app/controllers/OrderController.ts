import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Order } from 'modules/database/models/Order';
import { OrderRepository } from '../repositories/OrderRepository';
import { OrderService } from '../services/OrderService';
import { OrderSaveValidator } from '../validators/order/OrderSaveValidator';

@ApiTags('App: Order')
@Controller('/order')
export class OrderController {
  constructor(private orderRepository: OrderRepository, private orderService: OrderService) {}

  @Get()
  @ApiResponse({ status: 200 })
  public async getAllOrders() {
    return this.orderRepository.list();
  }

  @Get(':orderId')
  @ApiResponse({ status: 200, type: Order })
  public async details(@Param('orderId', ParseIntPipe) orderId: number) {
    console.log('Finding order ', orderId);
    return this.orderRepository.findById(orderId);
  }

  @Delete(':orderId')
  public async remove(@Param('orderId', ParseIntPipe) orderId: number) {
    return this.orderService.remove(orderId);
  }

  @Post()
  public async create(@Body() model: OrderSaveValidator) {
    return this.orderService.save(model);
  }
}
