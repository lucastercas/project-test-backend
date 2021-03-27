import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductService } from 'modules/admin/services/product';
import { ProductSaveValidator } from 'modules/admin/validators/product/save';
import { Product } from 'modules/database/models/product';
import { ProductRepository } from '../repositories/product';

@ApiTags('App: Product')
@Controller('/product')
export class ProductController {
  constructor(private productService: ProductService, private productRepository: ProductRepository) {}

  @Get()
  @ApiResponse({ status: 200, type: [Product] })
  public async getAllProducts() {
    return this.productRepository.list();
  }

  @Get(':productId')
  @ApiResponse({ status: 200, type: Product })
  public async getProduct(@Param('productId', ParseIntPipe) userId: number) {
    return this.productRepository.findById(userId);
  }

  @Delete(':productId')
  public async deleteProduct(@Param('productId', ParseIntPipe) productId: number) {
    return this.productService.remove(productId);
  }

  @Post()
  @ApiResponse({ status: 200, type: Product })
  public async save(@Body() model: ProductSaveValidator) {
    console.log('Inserindo produto: ', model);
    return this.productService.save(model);
  }

  @Put()
  @ApiResponse({ status: 200, type: Product })
  public async update(@Body() model: ProductSaveValidator) {
    return this.productService.update(model);
  }
}
