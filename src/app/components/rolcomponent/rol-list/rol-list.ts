import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {MatTableModule} from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { MatAnchor } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { RouterLink } from "@angular/router";
import { Rol } from '../../../models/Rol';
import { RolService } from '../../../services/rolservice';

@Component({
  selector: 'app-rol-list',
  imports: [MatTableModule, DatePipe, MatAnchor, MatIcon, MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './rol-list.html',
  styleUrl: './rol-list.css',
})
export class RolList implements OnInit{
  dataSource: MatTableDataSource<Rol>=new MatTableDataSource();
  displayedColumns:String[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9'];
  constructor(private rS: RolService){}

  ngOnInit(): void {
    this.cargarRol()
  }
  cargarRol(){
    this.rS.list().subscribe({
      next: (data)=>{
        this.dataSource.data = data
      }
    })
  }

  eliminar(id:number){
    console.log("ID recibido para eliminar:", id);
    this.rS.delete(id).subscribe((data)=>{
      this.rS.list().subscribe((data)=>{
        this.dataSource.data = data
      })
    })
  }


}
