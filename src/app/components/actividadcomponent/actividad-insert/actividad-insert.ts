import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { provideNativeDateAdapter } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { Actividad } from '../../../models/Actividad';
import { Actividadservice } from '../../../services/actividadservice';
import { Lote } from '../../../models/lote';
import { Usuario } from '../../../models/Usuario';
import { Loteservice } from '../../../services/loteservice';
import { UsuarioService } from '../../../services/usuarioservice';

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

  listaUsuarios: Usuario[] = [];
  listaLotes: Lote[] = [];

  hoy = new Date();
  mostrarErrores = false;

  constructor(
    private aS: Actividadservice,
    private router: Router,
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private loteService: Loteservice,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
  codigo: [''],
  descripcion: ['', [Validators.required, Validators.maxLength(100)]],
  fechaInicio: ['', [Validators.required]],
  fechaFin: ['', [Validators.required]],
  estado: ['', [Validators.required]],
  usuarioId: ['', [Validators.required]],
  loteId: ['', [Validators.required]],
});

    this.usuarioService.list().subscribe((data) => {
      this.listaUsuarios = data;
      this.cdr.detectChanges();
    });

    this.loteService.list().subscribe((data) => {
      this.listaLotes = data;
      this.cdr.detectChanges();
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.act.descripcion = this.form.value.descripcion;
      this.act.fechaInicio = this.form.value.fechaInicio;
      this.act.fechaFin = this.form.value.fechaFin;
      this.act.estado = this.form.value.estado;
this.act.usuarioId = this.form.value.usuarioId;
this.act.loteId = this.form.value.loteId;

      this.aS.insert(this.act).subscribe({
        next: () => {
          this.router.navigate(['actividad/listar-actividad']);
        },
        error: (error) => {
          console.log('ERROR STATUS:', error.status);
          console.log('ERROR BODY:', error.error);
        },
      });
    } else {
      this.form.markAllAsTouched();
      this.form.updateValueAndValidity();
    }
  }
  cancelar() {
  		this.router.navigate(['actividad/listar-actividad']);
	}
}