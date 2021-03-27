import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { IProduct } from 'modules/database/interfaces/IProduct';

export class ProductSaveValidator implements IProduct {
  @IsOptional()
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
