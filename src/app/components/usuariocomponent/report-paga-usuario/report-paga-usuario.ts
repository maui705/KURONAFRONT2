import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuarioservice';
import { QueryNative2DTO } from '../../../models/QueryNative2DTO';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource } from '@angular/material/table';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-report-paga-usuarios',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatFormFieldModule, MatInputModule, CurrencyPipe],
  templateUrl: './report-paga-usuario.html',
  styleUrls: ['./report-paga-usuario.css']
})
export class ReportPagaUsuarios implements OnInit {
  displayedColumns: string[] = ['username', 'apellido', 'pagoTotal'];
  dataSource = new MatTableDataSource<QueryNative2DTO>();

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.usuarioService.getPagaTotal().subscribe({
      next: (data) => {
        this.dataSource.data = data;
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
