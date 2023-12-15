import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Menu } from '../models/menu';


@Injectable({
  providedIn: 'root'
})
export class MenuService {
  [x: string]: any;
  url = 'http://localhost:4000/api/menu/';

  constructor(private http: HttpClient) { }
    getPlatos(): Observable<any>{
      return this.http.get(this.url);
    }

    eliminarPlato(id: string): Observable<any>{
      return this.http.delete(this.url + id);
    }

    guardarPlato(menu: Menu): Observable<any>{
      return this.http.post(this.url, menu);
    }

    obtenerPlato(id:string): Observable<any>{
      return this.http.get(this.url+id);
    }

    editarPlato(id:string, menu: Menu ): Observable<any>{
      return this.http.put(this.url+id, menu);
    }
}
