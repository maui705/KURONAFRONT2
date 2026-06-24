import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment.development';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-tipoprocesamiento-insert',
  imports: [ReactiveFormsModule, MatInputModule, MatButtonModule, MatIconModule, NgIf],
  templateUrl: './tipoprocesamiento-insert.html',
  styleUrl: './tipoprocesamiento-insert.css'
})
export class TipoProcesamientoInsert implements OnInit {
  form: FormGroup = new FormGroup({});
  exito = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required]
    });
  }

  registrar() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.http.post(`${environment.base}/api/tipoprocesamiento/registrar-tipoprocesamiento`, this.form.value).subscribe({
        next: () => {
          this.exito = true;
          setTimeout(() => this.router.navigate(['/tipoprocesamiento/listar']), 1500);
        }
      });
    }
  }
}