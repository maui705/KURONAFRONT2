import { Component ,ChangeDetectorRef} from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Para el [(ngModel)]
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'; // Para la barra de texto
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { AImagenes } from '../../../models/AImagenes';
import { Aimagenesservice } from '../../../services/aimagenesservice';

@Component({
  selector: 'app-buscar-defecto',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    DatePipe
  ],
  templateUrl: './buscar-defecto.html',
  styleUrl: './buscar-defecto.css',
})
export class BuscarDefecto {
  palabraBuscada: string = '';
  listaResultados: AImagenes[] = [];
  busquedaRealizada: boolean = false;

  constructor(
    private aiS: Aimagenesservice,
    private cdr: ChangeDetectorRef
  ) {}

  buscar() {
    if (!this.palabraBuscada.trim()) return;

    this.busquedaRealizada = true;
    this.listaResultados = [];

    this.aiS.buscarPorDefecto(this.palabraBuscada).subscribe({
      next: (data) => {
        this.listaResultados = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.listaResultados = [];
        console.error('Error buscando defecto', err);
        this.cdr.detectChanges();
      }
    });
  }
}
