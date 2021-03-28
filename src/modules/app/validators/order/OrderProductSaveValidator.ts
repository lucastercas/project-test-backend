import { IsInt, IsNotEmpty, IsOptional } from 'class-validator';
import { IOrderProduct } from 'modules/database/interfaces/IOrderProduct';

export class OrderProductSaveValidator implements IOrderProduct {
  @IsOptional()
  @IsInt()
  public id: number;

  @IsOptional()
  @IsInt()
  public orderId: number;

  @IsNotEmpty()
  @IsInt()
  public productId: number;

  @IsNotEmpty()
  public quantity: number;
}
