import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Analisisimagenservice {
  // Ajusta el host/puerto si tu backend Spring Boot corre en otra dirección
  private url = 'http://localhost:8080/api/imagen/analizar-imagen';
 
  constructor(private http: HttpClient) { }
 
  analizarImagen(imagen: File): Observable<any> {
    const formData = new FormData();
    formData.append('imagen', imagen);
    return this.http.post(this.url, formData);
  }
}
