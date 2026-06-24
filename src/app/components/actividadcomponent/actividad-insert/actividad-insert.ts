import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
<<<<<<< HEAD
import { ActivatedRoute, Router } from '@angular/router';
=======
import { Router } from '@angular/router';
>>>>>>> 705ecc2e07b50bb735d6edb7e14f4e666295a4e8
import { provideNativeDateAdapter } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { Actividad } from '../../../models/Actividad';
import { Actividadservice } from '../../../services/actividadservice';
import { MatFormFieldModule } from '@angular/material/form-field';
<<<<<<< HEAD
=======
import { MatSelectModule } from '@angular/material/select';

>>>>>>> 705ecc2e07b50bb735d6edb7e14f4e666295a4e8

@Component({
  selector: 'app-actividad-insert',
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatRadioModule,
    MatButtonModule,
    ReactiveFormsModule,
<<<<<<< HEAD
    CommonModule
=======
    CommonModule,
    MatSelectModule
>>>>>>> 705ecc2e07b50bb735d6edb7e14f4e666295a4e8
  ],
  templateUrl: './actividad-insert.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './actividad-insert.css',
})
export class ActividadInsert implements OnInit {
  form: FormGroup = new FormGroup({});
  act: Actividad = new Actividad();
<<<<<<< HEAD
=======
  hoy =  new Date();
  mostrarErrores = false;
>>>>>>> 705ecc2e07b50bb735d6edb7e14f4e666295a4e8

  constructor(
    private aS: Actividadservice,
    private router: Router,
    private formBuilder: FormBuilder,
<<<<<<< HEAD
    private route:ActivatedRoute
=======
>>>>>>> 705ecc2e07b50bb735d6edb7e14f4e666295a4e8
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      codigo: [''],
      descripcion: ['', [Validators.required, Validators.maxLength(100)]],
      fechaInicio: ['', [Validators.required]],
      fechaFin: ['', [Validators.required]],
      estado: ['', [Validators.required]],
      usuarioCodigo: ['', [Validators.required]],
      loteCodigo: ['', [Validators.required]],
    });
  }
aceptar() {
  if (this.form.valid) {
    this.act.descripcion = this.form.value.descripcion
    this.act.fechaInicio = this.form.value.fechaInicio
    this.act.fechaFin = this.form.value.fechaFin
    this.act.estado = this.form.value.estado
    this.act.usuarioId = this.form.value.usuarioCodigo
    this.act.loteId = this.form.value.loteCodigo

    this.aS.insert(this.act).subscribe({
      next: () => {
        this.router.navigate(['actividad/listar-actividad'])
      },
      error: (error) => {
        console.log('ERROR STATUS:', error.status)
        console.log('ERROR BODY:', error.error)
      }
    })
  } else {
    this.form.markAllAsTouched()
    this.form.updateValueAndValidity()
  }
}}