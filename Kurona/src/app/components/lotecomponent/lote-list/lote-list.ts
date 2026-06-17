import { Component, OnInit } from '@angular/core';

import { Lote } from '../../../../models/lote';
import { Loteservice } from '../../../../services/loteservice';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';


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
  ],
  templateUrl: './lote-list.html',
  styleUrl: './lote-list.css',
})
export class LoteList implements OnInit {
  dataSource: MatTableDataSource<Lote> = new MatTableDataSource();

  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8'];

  constructor(private lS: Loteservice) {}

  ngOnInit(): void {
    this.cargarLote();
  }
  
  cargarLote() {
    this.lS.list().subscribe({
      next: (data) => {
         console.log(data);
        this.dataSource.data = data;
      },
    });
  }

eliminar(id: number) {
  console.log('ID a eliminar:', id);

  this.lS.delete(id).subscribe(() => {
    this.cargarLote();
  });
}
}
