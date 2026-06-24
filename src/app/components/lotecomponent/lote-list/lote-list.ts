import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';

import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { Loteservice } from '../../../services/loteservice';
import { Lote } from '../../../models/lote';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-lote-list',
  imports: [
    MatInputModule,
    MatDatepickerModule,
    MatRadioModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatIconModule,
    RouterLink,
    MatPaginatorModule,
    CommonModule,
    MatCardModule,
  ],
  templateUrl: './lote-list.html',
  styleUrl: './lote-list.css',
})
export class LoteList implements OnInit, AfterViewInit {
  dataSource: MatTableDataSource<Lote> = new MatTableDataSource();

  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8'];

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(private lS: Loteservice) {}

  ngOnInit(): void {
    this.cargarLote();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  cargarLote() {
    this.lS.list().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
      },
    });
  }

  eliminar(id: number) {
    this.lS.delete(id).subscribe(() => {
      this.cargarLote();
    });
  }
}
