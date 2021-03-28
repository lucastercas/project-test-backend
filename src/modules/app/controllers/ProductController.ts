import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductSaveValidator } from 'modules/app/validators/product/ProductSaveValidator';
import { AuthRequired } from 'modules/common/guards/token';
import { enRoles } from 'modules/database/interfaces/IUser';
import { Product } from 'modules/database/models/Product';
import { ProductRepository } from '../repositories/ProductRepository';
import { ProductService } from '../services/ProductService';

@ApiTags('App: Product')
@Controller('/product')
@AuthRequired()
export class ProductController {
  constructor(private productService: ProductService, private productRepository: ProductRepository) {}

  @Get()
  @ApiResponse({ status: 200, type: [Product] })
  public async list() {
    return this.productRepository.list();
  }

  @Get(':productId')
  @ApiResponse({ status: 200, type: Product })
  public async findById(@Param('productId', ParseIntPipe) userId: number) {
    return this.productRepository.findById(userId);
  }

  @Delete(':productId')
  @AuthRequired([enRoles.admin])
  public async remove(@Param('productId', ParseIntPipe) productId: number) {
    return this.productService.remove(productId);
  }

  @Post()
  @ApiResponse({ status: 200, type: Product })
  @AuthRequired([enRoles.admin])
  public async save(@Body() model: ProductSaveValidator) {
    console.log('Inserindo produto: ', model);
    return this.productService.save(model);
  }

  @Put()
  @ApiResponse({ status: 200, type: Product })
  @AuthRequired([enRoles.admin])
  public async update(@Body() model: ProductSaveValidator) {
    return this.productService.update(model);
  }
}
