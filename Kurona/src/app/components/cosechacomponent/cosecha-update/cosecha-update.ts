import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { Cosecha } from '../../../../models/cosecha';
import { Cosechaservice } from '../../../../services/cosechaservice';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-cosecha-update',
  imports: [MatInputModule, MatRadioModule, MatButtonModule, ReactiveFormsModule, CommonModule],
  templateUrl: './cosecha-update.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './cosecha-update.css',
})
export class CosechaUpdate implements OnInit {
  id: number = 0;

  form: FormGroup = new FormGroup({});
  cos: Cosecha = new Cosecha();

  constructor(
    private cS: Cosechaservice,
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
      cantidad: ['', [Validators.required]],
      estadoCosecha: ['', [Validators.required]],
      firmaElectronica: ['', [Validators.required]],
      responsable: ['', [Validators.required]],
      metodos: ['', [Validators.required]],
      loteId: ['', [Validators.required]],
    });
  }


  aceptar() {
    if (this.form.valid) {
      this.cos.idCosecha = this.form.value.codigo;
      this.cos.cantidad = this.form.value.cantidad;
      this.cos.estadoCosecha = this.form.value.estadoCosecha;
      this.cos.firmaElectronica = this.form.value.firmaElectronica;
      this.cos.responsable = this.form.value.responsable;
      this.cos.metodos = this.form.value.metodos;
      this.cos.loteId = this.form.value.loteId;

      this.cS.update(this.cos).subscribe({
        next: () => {
          this.router.navigate(['cosecha/listar-cosecha']);
        },
      });
    }
  }

  init() {
    this.cS.listId(this.id).subscribe((data) => {
      this.form.patchValue({
        codigo: data.idCosecha,
        cantidad: data.cantidad,
        estadoCosecha: data.estadoCosecha,
        firmaElectronica: data.firmaElectronica,
        responsable: data.responsable,
        metodos: data.metodos,
        loteId: data.loteId,
      });
    });
  }
}
