import { Injectable } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Model } from 'objection';
import { IOrderProduct } from '../interfaces/IOrderProduct';

@Injectable()
export class OrderProduct extends Model implements IOrderProduct {
  public static tableName: string = 'OrderProduct';

  @ApiProperty({ type: 'integer' })
  public id: number;

  @ApiProperty({ type: 'integer' })
  public orderId: number;

  @ApiProperty({ type: 'integer' })
  public productId: number;

  @ApiProperty({ type: 'integer' })
  public quantity: number;
}
