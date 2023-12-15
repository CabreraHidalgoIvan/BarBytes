export class Categoria{
    _id?: string;
    nombre: string;
    descripcion: string;
    img: string;
    estado: string;

    constructor(nombre: string, descripcion:string, img:string, estado:string){
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.img= img;
        this.estado = estado;
    }
}