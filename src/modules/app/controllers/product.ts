import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Product } from 'modules/database/models/product';
import { ProductRepository } from '../repositories/product';

@ApiTags('App: Product')
@Controller('/product')
export class ProductController {
  constructor(private productRepository: ProductRepository) {}

  @Get()
  @ApiResponse({ status: 200, type: [Product] })
  public async getAllProducts() {
    return this.productRepository.list();
  }

  @Get(':productid')
  @ApiResponse({ status: 200, type: Product })
  public async getProduct() {}
}
