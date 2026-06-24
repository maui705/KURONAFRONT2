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


@Component({
  selector: 'app-usuario-insert',
  imports: [
    MatInputModule,
    MatDatepickerModule, 
    MatRadioModule, 
    MatButtonModule, 
    ReactiveFormsModule,
    CommonModule],
  templateUrl: './usuario-insert.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './usuario-insert.css',
})
export class UsuarioInsert implements OnInit {

  form:FormGroup = new FormGroup({})
  usu:Usuario = new Usuario()

  constructor(
    private uS:UsuarioService,
    private router:Router,
    private formBuilder:FormBuilder,
    private route:ActivatedRoute
  ){}
  ngOnInit(): void {
    this.form=this.formBuilder.group({
    name:['',[Validators.required, Validators.maxLength(100)]],
    extras:['',[Validators.required]],
    apellido:['',[Validators.required, Validators.maxLength(100)]],
    email:['',[Validators.required, Validators.maxLength(100)]],
    password:['',[Validators.required, Validators.maxLength(100)]],
    estado:['',[Validators.required]],
    fechaRegistro:['',[Validators.required]]
    })
  }
  aceptar(){
    if(this.form.valid){
        this.usu.username=this.form.value.name
        this.usu.extras=this.form.value.extras
        this.usu.apellido=this.form.value.apellido
        this.usu.email=this.form.value.email
        this.usu.password=this.form.value.password
        this.usu.estado=this.form.value.estado
        this.usu.fechaRegistro=this.form.value.fechaRegistro
        this.uS.insert(this.usu).subscribe({
        next:()=>{
          this.router.navigate(['usuario/listar-usuario'])
        }
      })
    }
    else{
      this.form.markAllAsTouched();
      this.form.updateValueAndValidity();
    }
  }
}
