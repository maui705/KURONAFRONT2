import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Lote } from '../../../../models/lote';
import { Loteservice } from '../../../../services/loteservice';
import { ActivatedRoute, Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-lote-insert',
  imports: [    
    MatInputModule, 
    MatDatepickerModule,
    MatRadioModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule],
  templateUrl: './lote-insert.html',
  styleUrl: './lote-insert.css',
})
export class LoteInsert implements OnInit {
form: FormGroup = new FormGroup({});
  lot:Lote = new Lote();
  constructor(
    private cS: Loteservice,
    private router: Router,
    private formBuilder: FormBuilder,
    private route:ActivatedRoute
  ) {}

   ngOnInit(): void {
    this.form = this.formBuilder.group({
     
      ubicacion: ['', Validators.required],
      tamaño: ['', Validators.required],
      variedadCafe: ['', Validators.required],
      observacion: ['', Validators.required],
      estado: ['', Validators.required],
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
          this.router.navigate(['/lote/listar-lote']);
        },
      });
    }
  }
}
