import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Actividad } from '../../../models/Actividad';
import { Actividadservice } from '../../../services/actividadservice';
import {MatTableModule} from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { MatAnchor } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-actividad-list',
  imports: [MatTableModule, DatePipe, MatAnchor, MatIcon, MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './actividad-list.html',
  styleUrl: './actividad-list.css',
})
export class ActividadList implements OnInit{
  dataSource: MatTableDataSource<Actividad>=new MatTableDataSource();
  displayedColums:String[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9'];
  constructor(private aS: Actividadservice){}

  ngOnInit(): void {
    this.cargarActividad()
  }
  cargarActividad(){
    this.aS.list().subscribe({
      next: (data)=>{
        this.dataSource.data = data
      }
    })
  }

  eliminar(id:number){
    this.aS.delete(id).subscribe((data)=>{
      this.aS.list().subscribe((data)=>{
        this.dataSource.data = data
      })
    })
  }
}
