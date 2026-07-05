import { Injectable } from "@angular/core";
import { Actividad } from "../models/Actividad";
import { environment } from "../../environments/environment.development";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { QuantityActividadUsuario } from "../models/QuantityActividadUsuario";
import { QuantityActividadLote } from "../models/QuantityActividadLote";

const base_url = environment.base
@Injectable({
  providedIn: 'root',
})
export class Actividadservice {
  private url = `${base_url}/api/actividad`
  constructor(private http: HttpClient) { }
  list() {
    return this.http.get<Actividad[]>(`${this.url}/listar-actividad`)
  }
  insert(a: Actividad) {
    return this.http.post(`${this.url}/registrar-actividad`, a);
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' })
  }
  listId(id: number) {
    return this.http.get<Actividad>(`${this.url}/${id}`)
  }
  update(a: Actividad) {
    return this.http.put(`${this.url}/actualizar-actividad`, a, { responseType: 'text' })
  }
  getQuantityByActividadLote(): Observable<QuantityActividadLote[]> {
    return this.http.get<QuantityActividadLote[]>(`${this.url}/cantidad-actividad-lote`);
  }
   getQuantityByActividadUsuario(): Observable<QuantityActividadUsuario[]> {
    return this.http.get<QuantityActividadUsuario[]>(`${this.url}/cantidad-actividad-usuario`);
  }
}
