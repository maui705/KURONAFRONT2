import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, RouterOutlet } from '@angular/router';
import { LoteList } from '../lote-list/lote-list';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Lote } from '../../../models/lote';
import { Loteservice } from '../../../services/loteservice';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-lote-update',
  imports: [
    MatInputModule,
    MatDatepickerModule,
    MatRadioModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule,
    MatSelectModule,
  ],
  templateUrl: './lote-update.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './lote-update.css',
})
export class LoteUpdate implements OnInit {
  id: number = 0;

  form: FormGroup = new FormGroup({});
  lot: Lote = new Lote();

  constructor(
    private lS: Loteservice,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.init();
    });

    this.form = this.formBuilder.group({
      codigo: [''],
      ubicacion: ['', [Validators.required, Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$')]],
      tamaño: ['', [Validators.required, Validators.min(1)]],
      variedadCafe: ['', [Validators.required]],
      observacion: ['', [Validators.required, Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$')]],
      estado: ['', [Validators.required]],
    });
  }

  aceptar() {
    if (this.form.valid) {
      this.lot.loteId = this.form.value.codigo;
      this.lot.ubicacion = this.form.value.ubicacion;
      this.lot.tamaño = this.form.value.tamaño;
      this.lot.variedadCafe = this.form.value.variedadCafe;
      this.lot.observacion = this.form.value.observacion;
      this.lot.estado = this.form.value.estado;

      this.lS.update(this.lot).subscribe({
        next: () => {
          this.router.navigate(['lote/listar-lote']);
        },
      });
    }
  }

  init() {
    this.lS.listId(this.id).subscribe((data) => {
      this.form.patchValue({
        codigo: data.loteId,
        variedadCafe: data.variedadCafe,
        observacion: data.observacion,
        ubicacion: data.ubicacion,
        tamaño: data.tamaño,
        estado: data.estado,
      });
    });
  }
}
