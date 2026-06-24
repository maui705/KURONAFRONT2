import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { Actividad } from '../../../models/Actividad';
import { Actividadservice } from '../../../services/actividadservice';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-actividad-update',
  imports:[
   MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatRadioModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './actividad-update.html',
    providers: [provideNativeDateAdapter()],
  styleUrl: './actividad-update.css',
})
export class ActividadUpdate implements OnInit{
  form:FormGroup = new FormGroup({})
  act:Actividad = new Actividad()
  id:number=0
  constructor(
    private aS:Actividadservice,
    private router:Router,
    private formBuilder:FormBuilder,
    private route:ActivatedRoute
  ){}
  ngOnInit(): void {
    
  this.form=this.formBuilder.group({
    descripcion:['',[Validators.required, Validators.maxLength(100)]],
    fechaInicio:['',[Validators.required]],
    fechaFin:['',[Validators.required]],
    estado:['',[Validators.required]],
    usuarioCodigo:['',[Validators.required]],
    loteCodigo:['',[Validators.required]],
    });
      this.route.params.subscribe((params:Params)=>{
        this.id=params['id'];
        this.init();
  });
  
}

  aceptar() {
    if (this.form.valid) {
      this.act.actividadid=this.id,
    this.act.descripcion=this.form.value.descripcion
    this.act.fechaInicio=this.form.value.fechaInicio
    this.act.fechaFin=this.form.value.fechaFin
    this.act.estado=this.form.value.estado
    this.act.usuarioId=this.form.value.usuarioCodigo
    this.act.loteId=this.form.value.loteCodigo

      this.aS.update(this.act).subscribe({
        next: () => {
          this.router.navigate(['actividad/listar-actividad']);
        } 
      });
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
          loteCodigo: data.loteId
        });
      },
      
    });
  }
}
