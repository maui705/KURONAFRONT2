import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {MatTableModule} from '@angular/material/table';
import { CommonModule, DatePipe } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { UsuarioService } from '../../../services/usuarioservice';
import { Usuario } from '../../../models/Usuario';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';



@Component({
  selector: 'app-usuario-list',
  imports: [MatTableModule, DatePipe, MatIconModule, MatButtonModule, RouterLink, MatCardModule,CommonModule,MatPaginatorModule ],
  templateUrl: './usuario-list.html',
  styleUrl: './usuario-list.css',
})
export class UsuarioList implements OnInit{
  dataSource: MatTableDataSource<Usuario> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4','c5','c6'];
  
  pageSize = 5;
  currentPage = 0;

get pagedData() {
  const start = this.currentPage * this.pageSize;
  return this.dataSource.data.slice(start, start + this.pageSize);
}

onPageChange(event: PageEvent) {
  this.currentPage = event.pageIndex;
  this.pageSize = event.pageSize;
}
  constructor(private uS: UsuarioService) { }


  ngOnInit(): void {
    this.cargarUsuario()
  }

  cargarUsuario() {
    this.uS.list().subscribe({
      next: (data) => {
        this.dataSource.data = data
      }
    })
  }

   eliminar(id:number){
    this.uS.delete(id).subscribe((data)=>{
      this.uS.list().subscribe((data)=>{
        this.dataSource.data = data
      })
    })
  }
}
