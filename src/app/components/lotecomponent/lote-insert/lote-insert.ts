import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Lote } from '../../../models/lote';
import { Loteservice } from '../../../services/loteservice';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lote-insert',
  imports: [
    MatInputModule,
    MatDatepickerModule,
    MatRadioModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSnackBarModule,
    CommonModule,
  ],
  templateUrl: './lote-insert.html',
  styleUrl: './lote-insert.css',
})
export class LoteInsert implements OnInit {
  form: FormGroup = new FormGroup({});
  lot: Lote = new Lote();
  constructor(
    private cS: Loteservice,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      ubicacion: ['', [Validators.required, Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$')]],
      tamaño: ['', [Validators.required, Validators.min(1)]],
      variedadCafe: ['false', Validators.required],
      observacion: ['', [Validators.required, Validators.minLength(5),Validators.maxLength(200)]],
      estado: ['false', Validators.required],
    });
  }

  aceptar() {
    if (this.form.valid) {
      this.lot.ubicacion = this.form.value.ubicacion;
      this.lot.tamaño = this.form.value.tamaño;
      this.lot.variedadCafe = this.form.value.variedadCafe;
      this.lot.observacion = this.form.value.observacion;
      this.lot.estado = this.form.value.estado;
      this.cS.insert(this.lot).subscribe({
        next: () => {
          this.snackBar.open('Registrado correctamente', 'Cerrar', {
            duration: 3000,
          });
          this.router.navigate(['/lote/listar-lote']);
        },
      });
    }
  }
// esto va en el insert <input matInput formControlName="ubicacion"(keypress)="soloLetras($event)"
// soloLetras(event: KeyboardEvent) {
//   const tecla = event.key;
//
//   if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]$/.test(tecla)) {
//     event.preventDefault();
//   }
// }

}
