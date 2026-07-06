import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Cosecha } from '../models/cosecha';
import { QuantityCosecha } from '../models/QuantityCosecha';
import { Observable } from 'rxjs';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class Cosechaservice {
  private url = `${base_url}/api/cosecha`;

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Cosecha[]>(`${this.url}/listar-cosecha`);
  }
  insert(p: Cosecha) {
    return this.http.post(`${this.url}/registrar-cosecha`, p);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }
  listId(id: number) {
    return this.http.get<Cosecha>(`${this.url}/${id}`);
  }
  update(u: Cosecha) {
    return this.http.put(`${this.url}/actualizar-cosecha`, u, { responseType: 'text' });
  }

  getQuantityByCosecha(): Observable<QuantityCosecha[]> {
    return this.http.get<QuantityCosecha[]>(`${this.url}/cantidad-cosecha-estado`);
  }
}
