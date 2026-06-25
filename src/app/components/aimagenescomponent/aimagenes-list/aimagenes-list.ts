import { CommonModule, DatePipe, NgIf } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { AImagenes } from '../../../models/AImagenes';
import { Aimagenesservice } from '../../../services/aimagenesservice';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar } from '@angular/material/snack-bar';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog'; // <-- 1. IMPORTAMOS MATDIALOG

@Component({
  selector: 'app-confirm-dialog',
  template: `
    <h2 mat-dialog-title style="margin-bottom: 10px;">Confirmar Eliminación</h2>
    <mat-dialog-content>
      <p style="font-size: 1rem; color: #555;">¿Estás seguro de que deseas eliminar este análisis? Esta acción no se puede deshacer.</p>
    </mat-dialog-content>
    <mat-dialog-actions align="end" style="padding-bottom: 15px; padding-right: 15px;">
      <button mat-button (click)="cancelar()">Cancelar</button>
      <button mat-raised-button color="warn" [mat-dialog-close]="true">Eliminar</button>
    </mat-dialog-actions>
  `,
  standalone: true,
  imports: [MatDialogModule, MatButtonModule]
})
export class ConfirmDialogComponent {
  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>) { }

  cancelar(): void {
    this.dialogRef.close(false); // Cierra la ventana enviando "false"
  }
}

@Component({
  selector: 'app-aimagenes-list',
  imports: [MatButtonModule, MatIconModule, RouterLink, MatCardModule, DatePipe, CommonModule, MatPaginator, MatDialogModule],
  templateUrl: './aimagenes-list.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './aimagenes-list.css',
})
export class AimagenesList implements OnInit {
  listaImagenes: AImagenes[] = [];
  listaPaginada: AImagenes[] = [];
  cargando: boolean = true;

  totalElementos: number = 0;
  pageSize: number = 6; // Por defecto mostramos 6 tarjetas
  pageIndex: number = 0;

  constructor(
    private aiS: Aimagenesservice,
    private cdr: ChangeDetectorRef,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.cargarAimagenes();
  }

  cargarAimagenes() {
    // 1. Ponemos el inicio de carga en la "cola de espera" de JavaScript
    // Esto evita que choque con la animación de cierre del MatDialog
    setTimeout(() => {
      this.cargando = true;
    });

    this.aiS.list().subscribe({
      next: (data) => {
        this.listaImagenes = data.sort((a, b) => b.idAImagenes - a.idAImagenes);
        this.actualizarPaginacion();

        // 2. Ponemos el fin de carga también en la cola de espera
        setTimeout(() => {
          this.cargando = false;
          this.cdr.detectChanges();
        });
      },
      error: (err) => {
        console.error('Error al cargar la lista de imágenes:', err);

        setTimeout(() => {
          this.cargando = false;
          this.cdr.detectChanges();
        });
      }
    });
  }
  cambiarPagina(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.actualizarPaginacion();
  }

  // Lógica matemática para recortar el arreglo
  actualizarPaginacion() {
    if (this.pageIndex * this.pageSize >= this.listaImagenes.length && this.pageIndex > 0) {
      this.pageIndex--;
    }
    const inicio = this.pageIndex * this.pageSize;
    const fin = inicio + this.pageSize;
    this.listaPaginada = this.listaImagenes.slice(inicio, fin);
    this.cdr.detectChanges(); // Evitamos el error NG0100
  }

  eliminar(id: number) {
    // Abrimos la ventana modal
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px', // Ancho de la ventanita
      disableClose: true // Evita que se cierre si hacen clic afuera por accidente
    });

    // Escuchamos qué botón presionó el usuario al cerrarse la ventana
    dialogRef.afterClosed().subscribe(confirmado => {
      if (confirmado) {
        // Si hizo clic en "Eliminar", ejecutamos la petición al backend
        this.aiS.delete(id).subscribe({
          next: () => {
            this.snackBar.open('Análisis eliminado correctamente', 'Cerrar', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom'
            });
            this.cargarAimagenes();
          },
          error: (err) => {
            console.error('Detalle de la eliminación:', err);
            this.cargarAimagenes();
          }
        });
      }
    });
  }
}