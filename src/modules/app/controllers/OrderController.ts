import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthRequired, CurrentUser } from 'modules/common/guards/token';
import { ICurrentUser } from 'modules/common/interfaces/currentUser';
import { PaginationValidator } from 'modules/common/validators/pagination';
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
  public async list(@Query() query: PaginationValidator, @CurrentUser() currentUser: ICurrentUser) {
    return this.orderRepository.list(query, currentUser);
  }

  @Get(':orderId')
  @ApiResponse({ status: 200, type: Order })
  public async findById(@Param('orderId', ParseIntPipe) orderId: number, @CurrentUser() currentUser: ICurrentUser) {
    return this.orderRepository.findById(orderId, currentUser);
  }

  @Delete(':orderId')
  public async remove(@Param('orderId', ParseIntPipe) orderId: number, @CurrentUser() currentUser: ICurrentUser) {
    return this.orderService.remove(orderId, currentUser);
  }

  @Post()
  public async create(@Body() model: OrderSaveValidator, @CurrentUser() currentUser: ICurrentUser) {
    return this.orderService.save(model, model.products, currentUser);
  }
}
