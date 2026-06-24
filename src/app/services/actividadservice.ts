import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Actividad } from "../models/Actividad";
import { environment } from "../../environments/environment.development";

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
}
