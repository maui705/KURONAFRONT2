import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { Actividad } from '../../../models/Actividad';
import { Actividadservice } from '../../../services/actividadservice';
import { Usuario } from '../../../models/Usuario';
import { Lote } from '../../../models/lote';
import { Loteservice } from '../../../services/loteservice';
import { UsuarioService } from '../../../services/usuarioservice';

@Component({
  selector: 'app-actividad-update',
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
  templateUrl: './actividad-update.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './actividad-update.css',
})
export class ActividadUpdate implements OnInit {
  form: FormGroup = new FormGroup({});
  act: Actividad = new Actividad();
  id: number = 0;

  listaUsuarios: Usuario[] = [];
  listaLotes: Lote[] = [];
  hoy = new Date();

  constructor(
    private aS: Actividadservice,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private usuarioService: UsuarioService,
    private loteService: Loteservice,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      descripcion: ['', [Validators.required, Validators.maxLength(100)]],
      fechaInicio: ['', [Validators.required]],
      fechaFin: ['', [Validators.required]],
      estado: ['', [Validators.required]],
      usuarioCodigo: ['', [Validators.required]],
      loteCodigo: ['', [Validators.required]],
    });

    this.usuarioService.list().subscribe((data) => {
      this.listaUsuarios = data;
      this.cdr.detectChanges();
    });

    this.loteService.list().subscribe((data) => {
      this.listaLotes = data;
      this.cdr.detectChanges();
    });

    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.init();
    });
  }

  aceptar() {
    if (this.form.valid) {
      this.act.actividadid = this.id;
      this.act.descripcion = this.form.value.descripcion;
      this.act.fechaInicio = this.form.value.fechaInicio;
      this.act.fechaFin = this.form.value.fechaFin;
      this.act.estado = this.form.value.estado;
      this.act.usuarioId = this.form.value.usuarioCodigo;
      this.act.loteId = this.form.value.loteCodigo;

      this.aS.update(this.act).subscribe({
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

  init() {
    this.aS.listId(this.id).subscribe({
      next: (data) => {
        this.form.patchValue({
          descripcion: data.descripcion,
          fechaInicio: data.fechaInicio,
          fechaFin: data.fechaFin,
          estado: data.estado,
          usuarioCodigo: data.usuarioId,
          loteCodigo: data.loteId,
        });

        this.cdr.detectChanges();
      },
    });
  }
  cancelar() {
  		this.router.navigate(['actividad/listar-actividad']);
	}
}