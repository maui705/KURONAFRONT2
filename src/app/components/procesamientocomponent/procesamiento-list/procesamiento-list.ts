import { Component, OnInit, ChangeDetectorRef, ViewChild, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { NgIf, NgFor, SlicePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-procesamiento-list',
  imports: [MatTableModule, MatIconModule, MatButtonModule, MatPaginatorModule, MatCardModule, NgIf, NgFor, SlicePipe],
  templateUrl: './procesamiento-list.html',
  styleUrl: './procesamiento-list.css'
})
export class ProcesamientoList implements OnInit, AfterViewInit {
  dataSource = new MatTableDataSource<any>([]);
  tipos: any[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef, private router: Router) {}

  ngOnInit(): void {
    this.http.get<any[]>(`${environment.base}/api/tipoprocesamiento/listar-tipoprocesamiento`).subscribe({
      next: (data) => {
        this.tipos = data;
        this.cargar();
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  cargar() {
    this.http.get<any[]>(`${environment.base}/api/procesamiento/listar-procesamiento`).subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.cdr.detectChanges();
      }
    });
  }

  getNombreTipo(tipoId: number): string {
    const tipo = this.tipos.find(t => t.tipoId === tipoId);
    return tipo ? tipo.nombre : tipoId.toString();
  }

  editar(id: number) {
    this.router.navigate(['/procesamiento/editar', id]);
  }

  eliminar(id: number) {
    this.http.delete(`${environment.base}/api/procesamiento/${id}`, {responseType: 'text'}).subscribe({
      next: () => {
        this.dataSource.data = this.dataSource.data.filter(p => p.procesamientoId !== id);
        this.cdr.detectChanges();
      }
    });
  }
}