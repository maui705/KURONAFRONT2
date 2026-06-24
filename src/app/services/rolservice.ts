import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Rol } from "../models/Rol";
import { environment } from "../../environments/environment.development";

const base_url=environment.base
@Injectable({
  providedIn: 'root',
})
export class RolService {

  private url=`${base_url}/api/rol`

  constructor(private http: HttpClient){}

  list(){
    return this.http.get<Rol[]>(`${this.url}/listar-rol`)
  }
  insert(r: Rol) {
    return this.http.post(`${this.url}/registrar-rol`, r);
  }
  delete(id:number) {
    return this.http.delete(`${this.url}/${id}`,{responseType:'text'}) 
  }
  listId(id:number) {
    return this.http.get<Rol>(`${this.url}/${id}`)
  }
  update(r:Rol) {
    return this.http.put(`${this.url}/actualizar-rol`, r,{responseType:'text'})
  }
}
