import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Plato } from '../models/plato';


@Injectable({
  providedIn: 'root'
})
export class PlatoService {
  [x: string]: any;
  url = 'http://localhost:4000/api/platos/';

  constructor(private http: HttpClient) { }
    getPlatos(): Observable<any>{
      return this.http.get(this.url);
    }

    eliminarPlato(id: string): Observable<any>{
      return this.http.delete(this.url + id);
    }

    guardarPlato(plato: Plato): Observable<any>{
      return this.http.post(this.url, plato);
    }

    obtenerPlato(id:string): Observable<any>{
      return this.http.get(this.url+id);
    }

    editarPlato(id:string, plato: Plato ): Observable<any>{
      return this.http.put(this.url+id, plato);
    }
}
