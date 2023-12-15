import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Categoria } from '../models/categoria';


@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  [x: string]: any;
  url = 'http://localhost:4000/api/categories/';

  constructor(private http: HttpClient) { }
    getCategorias(): Observable<any>{
      return this.http.get(this.url);
    }

    eliminarCategoria(id: string): Observable<any>{
      return this.http.delete(this.url + id);
    }

    guardarCategoria(categoria: Categoria): Observable<any>{
      return this.http.post(this.url, categoria);
    }

    obtenerCategoria(id:string): Observable<any>{
      return this.http.get(this.url+id);
    }

    editarCategoria(id:string, categoria: Categoria ): Observable<any>{
      return this.http.put(this.url+id, categoria);
    }
}
