import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment.development';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { provideNativeDateAdapter } from '@angular/material/core';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-procesamiento-update',
  imports: [ReactiveFormsModule, MatInputModule, MatButtonModule, MatIconModule, MatDatepickerModule, MatSelectModule, NgIf, NgFor],
  providers: [provideNativeDateAdapter()],
  templateUrl: './procesamiento-update.html',
  styleUrl: './procesamiento-update.css'
})
export class ProcesamientoUpdate implements OnInit {
  form: FormGroup = new FormGroup({});
  exito = false;
  id: number = 0;
  cosechas: any[] = [];
  tipos: any[] = [];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.form = this.fb.group({
      idCosecha: ['', Validators.required],
      tipoId: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required],
      cantidad: ['', Validators.required],
      estado: ['', Validators.required]
    });

    this.http.get<any[]>(`${environment.base}/api/cosecha/listar-cosecha`).subscribe({
      next: (data) => this.cosechas = data
    });

    this.http.get<any[]>(`${environment.base}/api/tipoprocesamiento/listar-tipoprocesamiento`).subscribe({
      next: (data) => this.tipos = data
    });

    this.http.get<any>(`${environment.base}/api/procesamiento/${this.id}`).subscribe({
      next: (data) => {
        this.form.patchValue({
          idCosecha: data.idCosecha,
          tipoId: data.tipoId,
          estado: data.estado,
          cantidad: data.cantidad,
          fechaInicio: data.fechaInicio,
          fechaFin: data.fechaFin
        });
      }
    });
  }

  actualizar() {
    if (this.form.valid) {
      const data = {
        procesamientoId: this.id,
        idCosecha: this.form.value.idCosecha,
        tipoId: this.form.value.tipoId,
        fechaInicio: this.formatDate(this.form.value.fechaInicio),
        fechaFin: this.formatDate(this.form.value.fechaFin),
        cantidad: this.form.value.cantidad,
        estado: this.form.value.estado
      };
      this.http.put(`${environment.base}/api/procesamiento/actualizar-procesamiento`, data, {responseType: 'text'}).subscribe({
        next: () => {
          this.exito = true;
          setTimeout(() => this.router.navigate(['/procesamiento/listar']), 3000);
        },
        error: () => {
          this.exito = true;
          setTimeout(() => this.router.navigate(['/procesamiento/listar']), 3000);
        }
      });
    }
  }

  formatDate(date: any): string {
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  }
}