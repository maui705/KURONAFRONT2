import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Cosecha } from '../../../models/cosecha';
import { Cosechaservice } from '../../../services/cosechaservice';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Loteservice } from '../../../services/loteservice';
import { Lote } from '../../../models/lote';

@Component({
  selector: 'app-cosecha-list',
  imports: [
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
    MatPaginatorModule,
    CommonModule,
    MatCardModule,
  ],
  templateUrl: './cosecha-list.html',
  styleUrl: './cosecha-list.css',
})
export class CosechaList implements OnInit, AfterViewInit {
  dataSource: MatTableDataSource<Cosecha> = new MatTableDataSource();

  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9'];

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  listaLotes: Lote[] = [];
  constructor(
    private cS: Cosechaservice,
    private lS: Loteservice,
  ) {}

  ngOnInit(): void {
    this.cargarLotes();
    this.cargarCosecha();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  cargarLotes() {
    this.lS.list().subscribe({
      next: (data) => {
        this.listaLotes = data;
      },
    });
  }

  obtenerUbicacion(loteId: number): string {
    const lote = this.listaLotes.find((l) => l.loteId === loteId);
    return lote ? lote.ubicacion : 'No encontrada';
  }

  cargarCosecha() {
    this.cS.list().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
      },
    });
  }

  eliminar(id: number) {
    this.cS.delete(id).subscribe(() => {
      this.cargarCosecha();
    });
  }
}
