import { ApiProperty } from '@nestjs/swagger';
import { Model } from 'objection';
import { IProduct } from '../interfaces/IProduct';

export class Product extends Model implements IProduct {
  @ApiProperty({ type: 'integer' })
  public id: number;

  @ApiProperty({ type: 'string' })
  public name: string;

  @ApiProperty({ type: 'string' })
  public description: string;

  @ApiProperty({ type: 'float' })
  public value: number;

  @ApiProperty({type: 'integer'})
  public quantity: number;

  public static get tableName(): string {
    return 'Product';
  }
}
