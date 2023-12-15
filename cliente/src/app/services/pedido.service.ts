import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Pedido } from '../models/pedido';


@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  [x: string]: any;
  url = 'http://localhost:4000/api/pedidos/';

  constructor(private http: HttpClient) { }
    getPedidos(): Observable<any>{
      return this.http.get(this.url);
    }

    eliminarPedido(id: string): Observable<any>{
      return this.http.delete(this.url + id);
    }

    guardarPedido(pedido: Pedido): Observable<any>{
      return this.http.post(this.url, pedido);
    }

    obtenerPedido(id:string): Observable<any>{
      return this.http.get(this.url+id);
    }

    editarPedido(id:string, pedido: Pedido ): Observable<any>{
      return this.http.put(this.url+id, pedido);
    }
}
