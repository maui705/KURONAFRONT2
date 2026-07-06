import { Component, ChangeDetectorRef } from '@angular/core'; // <-- 1. Importamos ChangeDetectorRef
import { CommonModule, DatePipe } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { AImagenes } from '../../../models/AImagenes';
import { Aimagenesservice } from '../../../services/aimagenesservice';

@Component({
  selector: 'app-aimagenes-buscar-formato',
  standalone: true,
  imports: [CommonModule, MatSelectModule, MatFormFieldModule, MatCardModule, MatIconModule, DatePipe],
  templateUrl: './aimagenes-buscar-formato.html',
  styleUrls: ['./aimagenes-buscar-formato.css'] 
})
export class AimagenesBuscarFormato {
  listaResultados: AImagenes[] = [];
  formatoSeleccionado: string = '';
  busquedaRealizada: boolean = false;
  mensajeError: string = '';

  formatosDisponibles: string[] = ['JPG', 'PNG', 'JPEG', 'TIFF']; 

  // 2. Inyectamos ChangeDetectorRef en el constructor
  constructor(
    private aiS: Aimagenesservice, 
    private cdr: ChangeDetectorRef
  ) {}

  buscar() {
    if (!this.formatoSeleccionado) return;
    
    this.busquedaRealizada = true;
    this.mensajeError = '';
    this.listaResultados = []; // Limpiamos resultados anteriores inmediatamente

    this.aiS.buscarPorFormato(this.formatoSeleccionado).subscribe({
      next: (data) => {
        this.listaResultados = data;
        this.cdr.detectChanges(); // <-- 3. Forzamos la actualización visual
      },
      error: (err) => {
        this.listaResultados = [];
        // Si el backend envía el texto de error, lo mostramos. Si no, usamos uno por defecto.
        this.mensajeError = typeof err.error === 'string' ? err.error : `No existen imágenes con el formato: ${this.formatoSeleccionado}`;
        this.cdr.detectChanges(); // <-- 4. Forzamos la actualización visual en caso de error
      }
    });
  }
}
