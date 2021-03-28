import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional } from 'class-validator';
import { IOrder } from 'modules/database/interfaces/IOrder';
import { OrderProductSaveValidator } from './OrderProductSaveValidator';

export class OrderSaveValidator implements IOrder {
  @IsOptional()
  @IsInt()
  @ApiProperty({ required: false, type: 'integer' })
  public id: number;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty({ required: true, type: 'integer' })
  public userId: number;

  @IsNotEmpty()
  public products: OrderProductSaveValidator[];
}
