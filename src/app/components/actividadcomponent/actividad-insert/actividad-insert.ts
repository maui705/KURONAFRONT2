import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { provideNativeDateAdapter } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { Actividad } from '../../../models/Actividad';
import { Actividadservice } from '../../../services/actividadservice';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';


@Component({
  selector: 'app-actividad-insert',
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatRadioModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule,
    MatSelectModule
  ],
  templateUrl: './actividad-insert.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './actividad-insert.css',
})
export class ActividadInsert implements OnInit {
  form: FormGroup = new FormGroup({});
  act: Actividad = new Actividad();
  hoy =  new Date();
  mostrarErrores = false;

  constructor(
    private aS: Actividadservice,
    private router: Router,
    private formBuilder: FormBuilder,
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