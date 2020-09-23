export class Producto {
    
    private producto_nombre: string;
    private precio: number;
    private marca:string;
   
    public constructor(nombre:string,precio:number,marca:string){
        this.producto_nombre=nombre;
        this.precio=precio;
        this.marca=marca;
    }

    public getNombre():string{
        return this.producto_nombre;
    }

    public getPrecio():number{
        return this.precio;
    }

    public getMarca():string{
        return this.marca;
    }
}