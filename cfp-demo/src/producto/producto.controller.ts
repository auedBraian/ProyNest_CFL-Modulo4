import { Controller, Get} from '@nestjs/common';
import { ProductoService } from './producto.service';
import {Producto } from './producto';

@Controller('productos')
export class ProductoController {
    constructor(private productoService: ProductoService) {}
   
    @Get()
    public getProducto(): Producto[] {
        return this.productoService.getProducto()
    }

}
