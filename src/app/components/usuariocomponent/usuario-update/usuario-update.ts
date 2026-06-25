import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Usuario } from '../../../models/Usuario';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { UsuarioService } from '../../../services/usuarioservice';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { provideNativeDateAdapter } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-usuario-update',
  imports: [
    MatInputModule,
    MatDatepickerModule,
    MatRadioModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule,
    MatIconModule
  ],
  templateUrl: './usuario-update.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './usuario-update.css',
})
export class UsuarioUpdate implements OnInit {

  id: number = 0;
  hide = true;

  form: FormGroup = new FormGroup({});
  usu: Usuario = new Usuario();

  emailOriginal: string = '';

  codigoEnviado: boolean = false;
  correoVerificado: boolean = false;
  mensajeVerificacion: string = '';

  constructor(
    private uS: UsuarioService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      codigo: [''],
      name: ['', [Validators.required, Validators.maxLength(100)]],
      extras: ['', [Validators.required, Validators.min(0)]],
      apellido: ['', [Validators.required, Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
      password: ['', [Validators.required, Validators.maxLength(100)]],
      estado: [false, [Validators.required]],
      fechaRegistro: [{ value: '', disabled: true }, [Validators.required]],
      codigoVerificacion: ['']
    });

    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.init();
    });

    this.form.get('email')?.valueChanges.subscribe(() => {
      if (this.emailCambio()) {
        this.codigoEnviado = false;
        this.correoVerificado = false;
        this.mensajeVerificacion = '';
        this.form.get('codigoVerificacion')?.setValue('');
      } else {
        this.codigoEnviado = false;
        this.correoVerificado = true;
        this.mensajeVerificacion = '';
        this.form.get('codigoVerificacion')?.setValue('');
      }
    });
  }

  emailCambio(): boolean {
    const emailActual = this.form.get('email')?.value;
    return emailActual !== this.emailOriginal;
  }

  enviarCodigo() {
    if (!this.emailCambio()) {
      alert('El correo no ha cambiado, no necesita verificación');
      return;
    }

    if (
      this.form.get('name')?.invalid ||
      this.form.get('apellido')?.invalid ||
      this.form.get('email')?.invalid ||
      this.form.get('password')?.invalid
    ) {
      alert('Completa correctamente username, apellido, email y password antes de enviar el código');
      this.form.markAllAsTouched();
      return;
    }

    const data = {
      username: this.form.value.name,
      apellido: this.form.value.apellido,
      email: this.form.value.email,
      password: this.form.value.password
    };

    this.uS.enviarCodigoRegistro(data).subscribe({
      next: (res) => {
        this.mensajeVerificacion = res;

        if (res === 'Código enviado al correo') {
          this.codigoEnviado = true;
          this.correoVerificado = false;
        }

        alert(res);
      },
      error: (err) => {
        console.error(err);
        alert('Error al enviar el código');
      }
    });
  }

  verificarCodigo() {
    if (!this.emailCambio()) {
      alert('El correo no ha cambiado, no necesita verificación');
      return;
    }

    if (!this.codigoEnviado) {
      alert('Primero debes enviar el código al nuevo correo');
      return;
    }

    const codigo = this.form.value.codigoVerificacion;

    if (!codigo || codigo.trim() === '') {
      alert('Ingresa el código de verificación');
      return;
    }

    const data = {
      email: this.form.value.email,
      codigo: codigo
    };

    this.uS.verificarCodigoRegistro(data).subscribe({
      next: (res) => {
        this.mensajeVerificacion = res;

        if (res === 'Correo verificado correctamente') {
          this.correoVerificado = true;
          alert('Correo verificado correctamente');
        } else {
          this.correoVerificado = false;
          alert(res);
        }
      },
      error: (err) => {
        console.error(err);
        alert('Error al verificar el código');
      }
    });
  }

  aceptar() {
    if (this.emailCambio() && !this.correoVerificado) {
      alert('Primero debes verificar el nuevo correo');
      return;
    }

    if (this.form.valid) {
      const rawValues = this.form.getRawValue();

      this.usu.usuario_Id = rawValues.codigo;
      this.usu.username = rawValues.name;
      this.usu.extras = rawValues.extras;
      this.usu.apellido = rawValues.apellido;
      this.usu.email = rawValues.email;
      this.usu.password = rawValues.password;
      this.usu.estado = rawValues.estado;
      this.usu.fechaRegistro = rawValues.fechaRegistro;

      this.uS.update(this.usu).subscribe({
        next: () => {
          this.router.navigate(['usuario/listar-usuario']);
        }
      });
    } else {
      this.form.markAllAsTouched();
      this.form.updateValueAndValidity();
    }
  }

  init() {
    this.uS.listId(this.id).subscribe(data => {
      this.emailOriginal = data.email;
      this.correoVerificado = true;

      this.form.patchValue({
        codigo: data.usuario_Id,
        name: data.username,
        extras: data.extras,
        apellido: data.apellido,
        email: data.email,
        password: data.password,
        estado: data.estado,
        fechaRegistro: data.fechaRegistro
      });
    });
  }
}