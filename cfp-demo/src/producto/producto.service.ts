import { Injectable } from '@nestjs/common'
import { Producto } from './producto'
import * as fs from 'fs';

@Injectable()
export class ProductoService {
    
    public getProductos(): any {
        let lista: Producto[] = this.loadProductos();
        return lista;
    }

    private loadProductos(): Producto[] {
        let listaProductos: Producto[];
        let archivo = fs.readFileSync('productos.csv', 'utf8');
        let lineas = archivo.split('\n');
        const elementos = [];
        for (let i = 0; i < lineas.length; i++) {
            let linea = lineas[i].replace('\r', '');
            let p = linea.split(',');
            elementos.push(p);
        }
        listaProductos = [];
        for (let i = 0; i < elementos.length; i++) {
            let producto = new Producto(elementos[i][0], parseInt(elementos[i][1]), elementos[i][2]);
            listaProductos.push(producto);
        }
        return listaProductos;
    }


    public getProducto(index: number): Producto {
        // Más adelante agregar manejo de status code
        let lista: Producto[] = this.loadProductos();
        if (index < 0 || index >= lista.length)
            return null;
        return lista[index];
    }






}



