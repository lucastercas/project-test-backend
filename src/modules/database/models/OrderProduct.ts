import { Injectable } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';
import { Model } from 'objection';
import { IOrderProduct } from '../interfaces/IOrderProduct';

@Injectable()
export class OrderProduct extends Model implements IOrderProduct {
  public static tableName: string = 'OrderProduct';

  @ApiProperty({ type: 'integer' })
  @IsInt()
  public id: number;

  @ApiProperty({ type: 'integer' })
  @IsInt()
  public orderId: number;

  @ApiProperty({ type: 'integer' })
  @IsInt()
  @IsNotEmpty()
  public productId: number;

  @ApiProperty({ type: 'integer' })
  @IsInt()
  @IsNotEmpty()
  public quantity: number;
}
