import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Actividad } from '../../../models/Actividad';
import { Actividadservice } from '../../../services/actividadservice';
import { MatTableModule } from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-actividad-list',
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    DatePipe,
    MatPaginatorModule,
    MatCardModule,
    CommonModule
  ],
  templateUrl: './actividad-list.html',
  styleUrl: './actividad-list.css',
})
export class ActividadList implements OnInit, AfterViewInit {
  dataSource: MatTableDataSource<Actividad>=new MatTableDataSource();
  displayedColumns:String[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private aS: Actividadservice){}

  ngOnInit(): void {
    this.cargarActividad()
  }
   ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  cargarActividad(){
    this.aS.list().subscribe({
      next: (data)=>{
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
      }
    })
  }

  eliminar(id:number){
    this.aS.delete(id).subscribe(() => {
      this.cargarActividad();
      });
  }
}
