import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {MatTableModule} from '@angular/material/table';
import { DatePipe } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { Usuario } from '../../../models/Usuario';
import { UsuarioService } from '../../../services/usuarioservice';



@Component({
  selector: 'app-usuario-list',
  standalone:true,
  imports: [MatTableModule, DatePipe, MatIconModule, MatButtonModule, RouterLink],
  templateUrl: './usuario-list.html',
  styleUrl: './usuario-list.css',
})
export class UsuarioList implements OnInit{
  dataSource: MatTableDataSource<Usuario> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4','c5','c6','c7','c8','c9','c10'];

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
