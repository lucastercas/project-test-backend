import { Injectable } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Model } from 'objection';
import { IOrder } from '../interfaces/IOrder';
import { OrderProduct } from './OrderProduct';
@Injectable()
export class Order extends Model implements IOrder {
  public static tableName: string = 'Order';

  @ApiProperty({ type: 'integer' })
  public id: number;

  @ApiProperty({ type: 'integer' })
  public userId: number;

  @ApiProperty({ nullable: false })
  public products?: OrderProduct[];

  public static get relationMappings(): any {
    return {
      products: {
        relation: Model.HasManyRelation,
        modelClass: OrderProduct,
        join: {
          from: 'Order.id',
          to: 'OrderProduct.orderId'
        }
      }
    };
  }
}
