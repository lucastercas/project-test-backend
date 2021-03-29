import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsOptional, IsString } from 'class-validator';
import { PaginationValidator } from 'modules/common/validators/pagination';

export class ProductListValidator extends PaginationValidator {
  @IsString()
  @IsOptional()
  @IsIn(['name', 'value', 'quantity'])
  @ApiProperty({ required: false, enum: ['name', 'value', 'quantity'] })
  public orderBy: string;
}
