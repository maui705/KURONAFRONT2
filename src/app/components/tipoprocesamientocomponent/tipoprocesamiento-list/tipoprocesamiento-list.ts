import { Component, OnInit, ChangeDetectorRef, ViewChild, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { NgIf, NgFor, SlicePipe } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tipoprocesamiento-list',
  imports: [MatTableModule, MatIconModule, MatButtonModule, MatInputModule, MatPaginatorModule, MatCardModule, NgIf, NgFor, SlicePipe, FormsModule],
  templateUrl: './tipoprocesamiento-list.html',
  styleUrl: './tipoprocesamiento-list.css'
})
export class TipoProcesamientoList implements OnInit, AfterViewInit {
  dataSource = new MatTableDataSource<any>([]);
  busqueda: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef, private router: Router) {}

  ngOnInit(): void {
    this.cargar();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  cargar() {
    this.http.get<any[]>(`${environment.base}/api/tipoprocesamiento/listar-tipoprocesamiento`).subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.cdr.detectChanges();
      }
    });
  }

  buscar() {
    if (this.busqueda.trim() === '') {
      this.cargar();
      return;
    }
    this.http.get<any[]>(`${environment.base}/api/tipoprocesamiento/buscar-tipoprocesamiento?nombre=${this.busqueda}`).subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.cdr.detectChanges();
      },
      error: () => {
        this.dataSource.data = [];
        this.cdr.detectChanges();
      }
    });
  }

  editar(id: number) {
    this.router.navigate(['/tipoprocesamiento/editar', id]);
  }

  eliminar(id: number) {
    this.http.delete(`${environment.base}/api/tipoprocesamiento/${id}`, {responseType: 'text'}).subscribe({
      next: () => {
        this.dataSource.data = this.dataSource.data.filter(t => t.tipoId !== id);
        this.cdr.detectChanges();
      }
    });
  }
}