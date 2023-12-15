export class Pedido{
    _id?: number;
    estado_pedido: string;
    id_cliente: string;
    lista_platos_ordenados: string[];
    mesa:number;
    precioTotal:number;
    comentarios:string;
    hora_pedido:Date;

    constructor(estado_pedido: string, 
                id_cliente: string, 
                lista_platos_ordenados: string[], 
                mesa:number,
                precioTotal:number,
                comentarios:string,
                hora_pedido:Date,
                ){
        this.estado_pedido = estado_pedido;
        this.id_cliente = id_cliente;
        this.lista_platos_ordenados= lista_platos_ordenados;
        this.mesa = mesa;
        this.precioTotal = precioTotal;
        this.comentarios = comentarios;
        this.hora_pedido = hora_pedido;
                }
}