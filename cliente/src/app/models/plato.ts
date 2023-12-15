export class Plato{
    _id?: number;
    categoriaId?: string;
    categoriaId2?: string;
    categoriaId3?: string;
    estado: string;
    nombre: string;
    descripcion: string;
    img: string;
    precio:number;

    constructor(nombre: string, descripcion:string, img:string, precio: number, estado: string,){
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.img= img;
        this.precio = precio;
        this.estado = estado;
    }
}