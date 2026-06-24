import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AImagenes } from '../models/AImagenes';
import { environment } from '../../environments/environment.development';

const base_url= environment.base;
@Injectable({
  providedIn: 'root',
})
export class Aimagenesservice {
  private url=`${base_url}/api/imagen`

  constructor(private http:HttpClient){}

  list(){
    return this.http.get<AImagenes[]>(`${this.url}/listar-imagen`)
  }
  insert(m: AImagenes) {
    return this.http.post(`${this.url}/registrar-imagen`, m);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }

    listId(id: number) {
    return this.http.get<AImagenes>(`${this.url}/${id}`);
  }

  update(m: AImagenes) {
    return this.http.put(`${this.url}/actualizar-imagen`, m, { responseType: 'text' });
  }


}
