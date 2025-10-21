import { Controller } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Pagination } from 'src/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // @Post()
  @MessagePattern({ cdm: 'create_product' })
  create(@Payload() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  // @Get()
  @MessagePattern({ cdm: 'find_all' })
  findAll(@Payload() pagination: Pagination) {
    // return pagination;
    return this.productsService.findAll(pagination);
  }

  // @Get(':id')
  @MessagePattern({ cdm: 'find_one' })
  findOne(@Payload('id') id: number) {
    return this.productsService.findOne(id);
  }

  // @Patch(':id')
  @MessagePattern({ cdm: 'update_product' })
  update(
    // @Param('id') id: string, @Body() updateProductDto: UpdateProductDto
    @Payload() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(updateProductDto.id, updateProductDto);
  }

  @MessagePattern({ cdm: 'delete_product' })
  remove(@Payload('id') id: number) {
    return this.productsService.remove(id);
  }
}
