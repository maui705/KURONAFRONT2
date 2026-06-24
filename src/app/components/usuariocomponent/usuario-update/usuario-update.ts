import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
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
  selector: 'app-usuario-update',
  imports: [
    MatInputModule,
    MatDatepickerModule, 
    MatRadioModule, 
    MatButtonModule, 
    ReactiveFormsModule,
    CommonModule],
  templateUrl: './usuario-update.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './usuario-update.css',
})
export class UsuarioUpdate implements OnInit {

  id:number = 0

  form:FormGroup = new FormGroup({})
  usu:Usuario = new Usuario()

  constructor(
    private uS:UsuarioService,
    private router:Router,
    private formBuilder:FormBuilder,
    private route:ActivatedRoute
  ){}
  ngOnInit(): void {
    this.route.params.subscribe((params:Params)=>{
      this.id=params['id']
      this.init()
    })

    this.form=this.formBuilder.group({
    codigo:[''],
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
        this.usu.usuario_Id=this.form.value.codigo
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
  }
  init(){
    this.uS.listId(this.id).subscribe(data=>{
      this.form.patchValue({
        codigo:data.usuario_Id,
        name:data.username,
        extras:data.extras,
        apellido:data.apellido,
        email:data.email,
        password:data.password,
        estado:data.estado,
        fechaRegistro:data.fechaRegistro
      })
    }
    )
  }
}
