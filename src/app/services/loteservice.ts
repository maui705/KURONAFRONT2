import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Lote } from '../models/lote';
import { QuantityLote } from '../models/QuantityLote';
import { Observable } from 'rxjs';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class Loteservice {
  private url = `${base_url}/api/lote`;

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Lote[]>(`${this.url}/listar-lote`);
  }

  insert(p: Lote) {
    return this.http.post(`${this.url}/registrar-lote`, p);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }

  listId(id: number) {
    return this.http.get<Lote>(`${this.url}/${id}`);
  }
  update(u: Lote) {
    return this.http.put(`${this.url}/actualizar-lote`, u, { responseType: 'text' });
  }
  getQuantityByLote(): Observable<QuantityLote[]> {
    return this.http.get<QuantityLote[]>(`${this.url}/cantidad-cosecha-lote`);
  }

}
