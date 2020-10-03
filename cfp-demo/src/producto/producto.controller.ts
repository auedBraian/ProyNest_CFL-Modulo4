import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { Producto } from './producto';


@Controller('productos')
export class ProductoController {
    constructor(private productoService: ProductoService) { }

    @Get()
    public getProductos(): Producto[] {
        return this.productoService.getProductos()
    }

    @Get(':index')
    public getProducto(@Param('index') index): Producto {
        return this.productoService.getProducto(parseInt(index));
    }

    @Post()
    create(@Body() prod: any): string {
        return this.productoService.create(prod);
    }

    @Delete(':index')
    public deleteProducto(@Param('index') index): boolean {
        return this.productoService.deleteProducto(parseInt(index));
    }

    @Put(':index')
    public updateProducto(@Body() prod: any, @Param('index') index): boolean {
        console.log(prod);
        return this.productoService.updateProducto(parseInt(index),prod);
    }
}
 
