import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/Usuario';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {

  private url = `${base_url}/api/usuario`;
  private urlRegistro = `${base_url}/api/registro`;

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<Usuario[]>(`${this.url}/listar-usuario`);
  }

  insert(u: Usuario) {
    return this.http.post(`${this.url}/registrar-usuario`, u);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }

  listId(id: number) {
    return this.http.get<Usuario>(`${this.url}/${id}`);
  }

  update(u: Usuario) {
    return this.http.put(`${this.url}/actualizar-usuario`, u, { responseType: 'text' });
  }

  enviarCodigoRegistro(data: any) {
    return this.http.post(`${this.urlRegistro}/enviar-codigo`, data, {
      responseType: 'text'
    });
  }

  verificarCodigoRegistro(data: any) {
    return this.http.post(`${this.urlRegistro}/verificar`, data, {
      responseType: 'text'
    });
  }
}