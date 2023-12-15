import { Plato } from "../models/plato";

export interface Pedido{
    _id?: number;
    estado_pedido: string;
    id_cliente: string;
    lista_platos_ordenados: any[];
    mesa:number;
    precioTotal:number;
    comentarios:string;
    hora_pedido:Date;
}