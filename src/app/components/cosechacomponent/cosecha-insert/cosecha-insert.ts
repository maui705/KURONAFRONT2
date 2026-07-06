import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOption, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';

import { Router } from '@angular/router';
import { Cosecha } from '../../../models/cosecha';
import { Cosechaservice } from '../../../services/cosechaservice';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { Loteservice } from '../../../services/loteservice';
import { Lote } from '../../../models/lote';

@Component({
  selector: 'app-cosecha-insert',
  imports: [
    MatInputModule,
    MatDatepickerModule,
    MatRadioModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatOption,
    MatSelectModule,
    CommonModule,
  ],
  templateUrl: './cosecha-insert.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './cosecha-insert.css',
})
export class CosechaInsert implements OnInit {
  form: FormGroup = new FormGroup({});
  cos: Cosecha = new Cosecha();

  // Lista de lotes para el desplegable
  listaLotes: Lote[] = [];

  constructor(
    private cS: Cosechaservice,
    private lS: Loteservice,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      cantidad: ['', [Validators.required, Validators.min(1)]],
      estadoCosecha: ['', Validators.required],
      firmaElectronica: ['', Validators.required],
      responsable: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$'),
        ],
      ],
      metodos: ['', Validators.required],
      loteId: ['', Validators.required],
    });

    this.listarLotes();
  }

  listarLotes() {
    this.lS.list().subscribe((data: Lote[]) => {
      this.listaLotes = data;
    });
  }

  aceptar() {
    if (this.form.valid) {
      this.cos.cantidad = this.form.value.cantidad;
      this.cos.estadoCosecha = this.form.value.estadoCosecha;
      this.cos.firmaElectronica = this.form.value.firmaElectronica;
      this.cos.responsable = this.form.value.responsable;
      this.cos.metodos = this.form.value.metodos;
      this.cos.loteId = this.form.value.loteId;

      this.cS.insert(this.cos).subscribe({
        next: () => {
          this.router.navigate(['/cosecha/listar-cosecha']);
        },
      });
    }
  }

  cancelar() {
  	this.router.navigate(['cosecha/listar-cosecha']);
	}
}