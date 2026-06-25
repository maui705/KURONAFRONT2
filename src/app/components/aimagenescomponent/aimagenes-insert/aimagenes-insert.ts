import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { Router } from '@angular/router'
import { AImagenes } from '../../../models/AImagenes';
import { Aimagenesservice } from '../../../services/aimagenesservice';
import { Loteservice } from '../../../services/loteservice';
import { Analisisimagenservice } from '../../../services/analisisimagenservice';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';


@Component({
  selector: 'app-aimagenes-insert',
  imports: [MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatRadioModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule,
    MatCardModule,
    MatSnackBarModule],
  templateUrl: './aimagenes-insert.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './aimagenes-insert.css',
})
export class AimagenesInsert implements OnInit{

  form: FormGroup = new FormGroup({});
  aim: AImagenes = new AImagenes();
  loteNoExiste: boolean = false;
 
  imagenSeleccionada: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;
  analizando: boolean = false;
  imagenError: boolean = false;
  rutaImagenGuardada: string = '';
 
  constructor(
    private aiS: Aimagenesservice,
    private loteS: Loteservice,
    private analisisS: Analisisimagenservice,
    private router: Router,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) { }
 
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      // Fecha de análisis: siempre hoy, deshabilitada para que no se pueda editar manualmente
      fechaAnalisis: [{ value: new Date(), disabled: true }],
      formato: ['', [Validators.required, Validators.maxLength(20)]],
      defectos: ['', [Validators.required, Validators.maxLength(2000)]],
      // Estado siempre inicia en Inactivo (false); el usuario puede cambiarlo a Activo
      estado: ['false', [Validators.required]],
      loteCodigo: ['', [Validators.required]],
    });
    this.form.get('loteCodigo')?.valueChanges.subscribe(() => {
      this.loteNoExiste = false;
    });
  }
 
  onImagenSeleccionada(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;
 
    const file = input.files[0];
    this.imagenSeleccionada = file;
    this.imagenError = false;
 
    // Vista previa de la imagen
    const reader = new FileReader();
    reader.onload = () => this.previewUrl = reader.result;
    reader.readAsDataURL(file);
 
    // La fecha de análisis siempre se refresca a hoy al subir una imagen
    this.form.get('fechaAnalisis')?.setValue(new Date());
 
    // Mientras se analiza, limpiamos los campos derivados
    this.analizando = true;
    this.form.patchValue({ formato: '', defectos: '' });
 
    this.analisisS.analizarImagen(file).subscribe({
      next: (res: any) => {
        this.form.patchValue({
          formato: res.formato,
          defectos: res.defectosEncontrados,
        });
        this.rutaImagenGuardada = res.rutaImagen;
        this.analizando = false;
      },
      error: (error) => {
        console.error('Error al analizar la imagen:', error);
        this.analizando = false;
        
        // Verificamos si el backend devolvió el texto sobre el error 429
        if (error.error && error.error.includes('429')) {
            alert('El servidor de IA está saturado en este momento (Límite de peticiones). Por favor, espera unos 15 segundos y vuelve a subir la imagen.');
        } else {
            alert('Hubo un error al analizar la imagen. Puedes escribir los defectos manualmente.');
        }
      }
    });
  }
  cancelar() {
    this.router.navigate(['aimagenes/listar-imagen']);
  }
 
  aceptar() {
    if (!this.imagenSeleccionada) {
      this.imagenError = true;
      return;
    }
 
    if (this.form.valid) {
      // getRawValue() incluye también el control deshabilitado (fechaAnalisis)
      const valores = this.form.getRawValue();
      const loteId = valores.loteCodigo;
 
      // 👇 Primero verifica si el lote existe
      this.loteS.listId(loteId).subscribe({
        next: () => {
          // El lote existe, procede a registrar
          this.loteNoExiste = false;
          this.aim.fechaAnalisis        = valores.fechaAnalisis;
          this.aim.formato              = valores.formato;
          this.aim.defectosEncontrados  = valores.defectos;
          this.aim.estado               = valores.estado === 'true';
          this.aim.loteId               = loteId;
          this.aim.rutaImagen           = this.rutaImagenGuardada; // ya existe en AImagenesDTO/entidad
 
          this.aiS.insert(this.aim).subscribe({
            
            next: () => {
              this.router.navigate(['aimagenes/listar-imagen']);
              this.snackBar.open('Imagen registrada correctamente', 'Cerrar', {
                duration: 3000,
                horizontalPosition: 'center',
                verticalPosition: 'bottom'
              });
            },
            error: (error) => {
              console.log('ERROR STATUS:', error.status);
              console.log('ERROR BODY:', error.error);
            }
          });
        },
        error: () => {
          // El lote no existe, muestra el error
          this.loteNoExiste = true;
          this.cdr.detectChanges();
        }
      });
 
    } else {
      this.form.markAllAsTouched();
      this.form.updateValueAndValidity();
    }
  }
}
