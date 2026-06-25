import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Usuario } from '../../../models/Usuario';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { UsuarioService } from '../../../services/usuarioservice';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { provideNativeDateAdapter } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { Rol } from '../../../models/Rol';
import { RolService } from '../../../services/rolservice';


@Component({
  selector: 'app-rol-insert',
  imports: [
    MatInputModule,
    MatDatepickerModule, 
    MatRadioModule, 
    MatButtonModule, 
    ReactiveFormsModule,
    CommonModule],
  templateUrl: './rol-insert.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './rol-insert.css',
})
export class RolInsert implements OnInit {

  form:FormGroup = new FormGroup({})
  ro:Rol = new Rol()

  constructor(
    private rS:RolService,
    private router:Router,
    private formBuilder:FormBuilder,
    private route:ActivatedRoute
  ){}
  ngOnInit(): void {
    this.form=this.formBuilder.group({
    rol:['',[Validators.required, Validators.maxLength(100)]],
    descripcion:['',[Validators.required, Validators.maxLength(100)]],
    sueldo:['',[Validators.required,Validators.min(0)]],
    permisos:['',[Validators.required, Validators.maxLength(100)]],
    fechaCreacion:[{ value: new Date(), disabled: true },[Validators.required]],
    user_id:['',[Validators.required]]
    })
  }
  aceptar(){
    if(this.form.valid){
        const rawValues = this.form.getRawValue();
        this.ro.rol=this.form.value.rol
        this.ro.descripcion=this.form.value.descripcion
        this.ro.sueldo=this.form.value.sueldo
        this.ro.permisos=this.form.value.permisos
        this.ro.fechaCreacion=rawValues.fechaCreacion
        this.ro.user_id=this.form.value.user_id
        this.rS.insert(this.ro).subscribe({
        next:()=>{
          this.router.navigate(['rol/listar-rol'])
        }
      })
    }
    else{
      this.form.markAllAsTouched();
      this.form.updateValueAndValidity();
    }
  }
}
