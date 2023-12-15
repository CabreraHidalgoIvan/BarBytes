export class Menu{
    _id?: number;
    nombre_plato: string;
    descripcion: string;
    precio: number;
    ingredientes:string[];
    opciones_personalizacion:string[];
    imagen:string;
    categoria:string;
    puntuacion:number;
    stock: number;
    visible_en_carta:boolean;
    calorias:number;

    constructor(nombre_plato: string, 
                descripcion:string, 
                precio: number, 
                ingredientes:string[], 
                opciones_personalizacion:string[],
                imagen:string,
                categoria:string,
                puntuacion:number,
                stock: number,
                visible_en_carta:boolean,
                calorias:number,
                ){
        this.nombre_plato = nombre_plato;
        this.descripcion = descripcion;
        this.precio= precio;
        this.ingredientes = ingredientes;
        this.opciones_personalizacion = opciones_personalizacion;
        this.imagen = imagen;
        this.categoria = categoria;
        this.puntuacion = puntuacion;
        this.stock = stock;
        this.visible_en_carta = visible_en_carta;
        this.calorias = calorias;
    }
}