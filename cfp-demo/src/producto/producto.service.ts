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
            fs.appendFileSync('productos.csv', `\n${producto.getNombre()},${producto.getPrecio()},${producto.getMarca()}`);
            return "ok";
        }
        else {
            return "parametros incorrectos";
        }
    }

    public deleteProducto(index: number): boolean {
        let borrado = this.listaProductos.splice(index, 1);

        //actualizo archivo de texto
        this.updateTxt();
        return borrado.length == 1;
    }

    public updateProducto(position: number,prod: any): boolean {
        let producto = new Producto(prod.producto_nombre, prod.precio, prod.marca);

        //me paro en la posicion, elimino lo que hay, inserto el nuevo
        this.listaProductos.splice(position, 1, producto);
        //actualizo archivo de texto
        this.updateTxt();
        return true;
    }


    //actualizo archivo de texto con la lista de productos disponibles al momento de llamar a esta funcion
    public updateTxt() {
        let producto: Producto;
        if(this.listaProductos.length>0){
            fs.writeFileSync('productos.csv', this.getProductoLine(this.listaProductos[0]), 'utf8');
        }
        else{
       //dejo en blanco mi archivo de texto
        fs.writeFileSync('productos.csv', '', 'utf8');
        }

        for (let i: number = 1; i <= this.listaProductos.length; i++) {
            //voy reemplazando el producto uno a uno con los de la lista
            producto = this.listaProductos[i];
            fs.appendFileSync('productos.csv', `\n${this.getProductoLine(this.listaProductos[i])}`);
        }

    }


    private getProductoLine(producto: Producto): string {
        return `${producto.getNombre()},${producto.getPrecio()},${producto.getMarca()}`;
    }

    
}