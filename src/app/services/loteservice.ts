import { Injectable } from '@angular/core';
import { environment } from '../../environments/enviroment.develoments';
import { HttpClient } from '@angular/common/http';
import { Lote } from '../models/Lote';

const base_url = environment.base

@Injectable({
  providedIn: 'root',
})
export class Loteservice {
  private url = `${base_url}/api/lote`

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<Lote[]>(`${this.url}/listar-lote`)
  }
  insert(u:Lote) {
    return this.http.post(`${this.url}/registrar-lote`, u)
  }
  delete(id:number) {
    return this.http.delete(`${this.url}/${id}`,{responseType:'text'}) 
  }
  listId(id:number) {
    return this.http.get<Lote>(`${this.url}/${id}`)
  }
  update(u:Lote) {
    return this.http.put(`${this.url}/actualizar-lote`, u,{responseType:'text'})
  }
}
