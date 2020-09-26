import { Injectable } from '@nestjs/common'
import { Producto } from './producto'
import * as fs from 'fs';

@Injectable()
export class ProductoService {

    private listaProductos: Producto[];

    public getProductos(): any {
        let lista: Producto[] = this.loadProductos();
        return lista;
    }

    private loadProductos(): Producto[] {
        let archivo = fs.readFileSync('productos.csv', 'utf8');
        let lineas = archivo.split('\n');
        const elementos = [];
        for (let i = 0; i < lineas.length; i++) {
            let linea = lineas[i].replace('\r', '');
            let p = linea.split(',');
            elementos.push(p);
        }
        this.listaProductos = [];
        for (let i = 0; i < elementos.length; i++) {
            let producto = new Producto(elementos[i][0], parseInt(elementos[i][1]), elementos[i][2]);
            this.listaProductos.push(producto);
        }
        return this.listaProductos;
    }


    public getProducto(index: number): Producto {
        let lista: Producto[] = this.loadProductos();
        if (index < 0 || index >= lista.length)
            return null;
        return lista[index];
    }

    public create(prod: any) {
        const producto = new Producto(prod.producto_nombre, prod.precio, prod.marca);
        if (producto.getNombre() && producto.getPrecio() && producto.getMarca()) {
            fs.appendFileSync('productos.csv',`\n${producto.getNombre()},${producto.getPrecio()},${producto.getMarca()}`);
            return "ok";
        }
        else {
            return "parametros incorrectos";
        }

    }

}