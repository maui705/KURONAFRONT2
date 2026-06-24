import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment.development';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { provideNativeDateAdapter } from '@angular/material/core';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-procesamiento-insert',
  imports: [ReactiveFormsModule, MatInputModule, MatButtonModule, MatIconModule, MatDatepickerModule, MatSelectModule, NgIf, NgFor],
  providers: [provideNativeDateAdapter()],
  templateUrl: './procesamiento-insert.html',
  styleUrl: './procesamiento-insert.css'
})
export class ProcesamientoInsert implements OnInit {
  form: FormGroup = new FormGroup({});
  exito = false;
  cosechas: any[] = [];
  tipos: any[] = [];
  hoy = new Date();
  mostrarErrores = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log('ngOnInit ejecutado');
    this.form = this.fb.group({
      idCosecha: ['', Validators.required],
      tipoId: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required],
      cantidad: ['', Validators.required],
      estado: ['', Validators.required]
    });

    this.http.get<any[]>(`${environment.base}/api/cosecha/listar-cosecha`).subscribe({
      next: (data) => {
        this.cosechas = data;
        console.log('cosechas:', data);
      },
      error: (e) => console.log('error cosecha:', e)
    });

    this.http.get<any[]>(`${environment.base}/api/tipoprocesamiento/listar-tipoprocesamiento`).subscribe({
      next: (data) => {
        this.tipos = data;
        console.log('tipos:', data);
      },
      error: (e) => console.log('error tipos:', e)
    });
  }

  registrar() {
    console.log('registrar ejecutado');
    console.log('mostrarErrores:', this.mostrarErrores);
    console.log('form valid:', this.form.valid);
    this.mostrarErrores = true;
    console.log('mostrarErrores después:', this.mostrarErrores);
    if (this.form.valid) {
      const data = {
        idCosecha: this.form.value.idCosecha,
        tipoId: this.form.value.tipoId,
        fechaInicio: this.formatDate(this.form.value.fechaInicio),
        fechaFin: this.formatDate(this.form.value.fechaFin),
        cantidad: this.form.value.cantidad,
        estado: this.form.value.estado
      };
      this.http.post(`${environment.base}/api/procesamiento/registrar-procesamiento`, data).subscribe({
        next: () => {
          this.exito = true;
          this.mostrarErrores = false;
          setTimeout(() => this.router.navigate(['/procesamiento/listar']), 1500);
        }
      });
    }
  }

  formatDate(date: any): string {
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  }
}