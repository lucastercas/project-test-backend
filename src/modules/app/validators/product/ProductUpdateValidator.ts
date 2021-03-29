import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { IProduct } from 'modules/database/interfaces/IProduct';

export class ProductUpdateValidator implements IProduct {
  @IsNotEmpty()
  @IsInt()
  @ApiProperty({ required: false, type: 'integer' })
  public id?: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'string', required: true })
  public name: string;

  @IsNotEmpty()
  @ApiProperty({ type: 'string', required: true })
  public description: string;

  @IsNotEmpty()
  @ApiProperty({ type: 'float', required: true })
  public value: number;

  @IsNotEmpty()
  @ApiProperty({ type: 'integer', required: true })
  public quantity: number;
}
