import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Cosecha } from '../../../../models/cosecha';
import { Cosechaservice } from '../../../../services/cosechaservice';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cosecha-list',
  imports: [
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    RouterLink
  ],
  
  templateUrl: './cosecha-list.html',
  styleUrl: './cosecha-list.css',
})
export class CosechaList implements OnInit {
  dataSource: MatTableDataSource<Cosecha> = new MatTableDataSource();
  
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6','c7','c8','c9'];

  constructor(private cS: Cosechaservice) {}  

   ngOnInit(): void {
    this.cargarCosecha();
  }
    cargarCosecha() {
    this.cS.list().subscribe({
      next: (data) => {
        this.dataSource.data = data;
      },
    });
  }
  eliminar(id: number) {
    this.cS.delete(id).subscribe(() => {
      this.cargarCosecha();
    });
  }
}
