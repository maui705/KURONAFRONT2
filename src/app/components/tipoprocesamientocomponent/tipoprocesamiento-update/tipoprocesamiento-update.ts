import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment.development';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-tipoprocesamiento-update',
  imports: [ReactiveFormsModule, MatInputModule, MatButtonModule, MatIconModule, NgIf],
  templateUrl: './tipoprocesamiento-update.html',
  styleUrl: './tipoprocesamiento-update.css'
})
export class TipoProcesamientoUpdate implements OnInit {
  form: FormGroup = new FormGroup({});
  exito = false;
  id: number = 0;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required]
    });

    this.http.get<any>(`${environment.base}/api/tipoprocesamiento/${this.id}`).subscribe({
      next: (data) => {
        this.form.patchValue({
          nombre: data.nombre,
          descripcion: data.descripcion
        });
      }
    });
  }

  actualizar() {
    if (this.form.valid) {
      const data = {
        tipoId: this.id,
        nombre: this.form.value.nombre,
        descripcion: this.form.value.descripcion
      };
      this.http.put(`${environment.base}/api/tipoprocesamiento/actualizar-tipoprocesamiento`, data, {responseType: 'text'}).subscribe({
        next: () => {
          this.exito = true;
          setTimeout(() => this.router.navigate(['/tipoprocesamiento/listar']), 3000);
        },
        error: () => {
          this.exito = true;
          setTimeout(() => this.router.navigate(['/tipoprocesamiento/listar']), 3000);
        }
      });
    }
  }
}