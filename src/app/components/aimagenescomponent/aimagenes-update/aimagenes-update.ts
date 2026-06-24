import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select'; // <-- IMPORTANTE
import { AImagenes } from '../../../models/AImagenes';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Aimagenesservice } from '../../../services/aimagenesservice';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Loteservice } from '../../../services/loteservice';

@Component({
  selector: 'app-aimagenes-update',
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatRadioModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule,
    MatCardModule,
    MatSnackBarModule,
    MatSelectModule // <-- Añadido aquí
  ],
  templateUrl: './aimagenes-update.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './aimagenes-update.css',
})
export class AimagenesUpdate implements OnInit {
  id: number = 0;
  form: FormGroup = new FormGroup({});
  aim: AImagenes = new AImagenes();
  minDate!: Date;
  loteNoExiste: boolean = false;
  imageUrl: string = '';

  formatosPermitidos: string[] = ['JPG', 'JPEG', 'PNG', 'WEBP', 'GIF', 'TIFF', 'BMP'];

  constructor(
    private aiS: Aimagenesservice,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private loteS: Loteservice,
    private cdr: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.init();
    });

    this.form = this.formBuilder.group({
      codigo: [''],
      fechaAnalisis: [{ value: new Date(), disabled: true }],
      formato: ['', [Validators.required]],
      // Subido a 500 para igualar a la BD (o ponlo en 2000 si lo alteraste antes)
      defectos: ['', [Validators.required, Validators.maxLength(2000)]],
      estado: ['', [Validators.required]],
      loteCodigo: ['', [Validators.required, Validators.min(1)]],
    });

    this.form.get('loteCodigo')?.valueChanges.subscribe(() => {
      this.loteNoExiste = false;
    });
  }

  aceptar() {
      if (this.form.valid) {
        const valores = this.form.getRawValue(); // Usamos getRawValue() para obtener el valor incluso de los campos deshabilitados
        const loteId = valores.loteCodigo;

 
      this.loteS.listId(loteId).subscribe({
        next: () => {
          this.loteNoExiste = false;// El lote sí existe

          // 👇 5. CORRECCIÓN DE ZONA HORARIA PARA LA FECHA
          const fechaSeleccionada: Date = valores.fechaAnalisis;
          const fechaAjustada = new Date(
            fechaSeleccionada.getTime() - (fechaSeleccionada.getTimezoneOffset() * 60000)
          );

          // Asignamos valores
          this.aim.idAImagenes = valores.codigo;
          this.aim.fechaAnalisis = fechaAjustada; // Mandamos la fecha corregida
          this.aim.formato = valores.formato;
          this.aim.defectosEncontrados = valores.defectos;
          this.aim.estado = valores.estado === 'true';
          this.aim.loteId = loteId; // Mandamos el lote validado

          // Enviamos la actualización
          this.aiS.update(this.aim).subscribe({
            next: () => {
              this.snackBar.open('Análisis actualizado correctamente', 'Cerrar', {
                duration: 3000,
                horizontalPosition: 'center',
                verticalPosition: 'bottom'
              });
              this.router.navigate(['aimagenes/listar-imagen']);
            },
            error: (error) => {
              console.log('ERROR STATUS:', error.status);
              console.log('ERROR BODY:', error.error);
              this.snackBar.open('Error al actualizar en la base de datos', 'Cerrar', { duration: 3000 });
            }
          });
        },
        error: () => {
          // El lote no existe en la base de datos
          this.loteNoExiste = true;
          this.cdr.detectChanges();
        }
      });

    } else {
      this.form.markAllAsTouched();
      this.form.updateValueAndValidity();
    }
  }
  // NUEVO METODO PARA EL BOTON CANCELAR
  cancelar() {
    this.router.navigate(['aimagenes/listar-imagen']);
  }

  init() {
    this.aiS.listId(this.id).subscribe(data => {
      // Capturamos la fecha original y la guardamos en minDate
      // (Se le añade T00:00:00 para evitar desfasajes por la zona horaria)
      let fechaOriginal: Date;
      
      if (data.fechaAnalisis) {
        // Separamos la cadena "2026-06-25" en sus tres partes
        const partes = data.fechaAnalisis.toString().split('-');
        const anio = parseInt(partes[0], 10);
        const mes = parseInt(partes[1], 10) - 1; // En JavaScript los meses van de 0 a 11
        const dia = parseInt(partes[2], 10);
        
        // Al crearla así, forzamos a que sea exactamente la medianoche de tu hora local
        fechaOriginal = new Date(anio, mes, dia);
      } else {
        fechaOriginal = new Date();
      }

      this.minDate = fechaOriginal;
      // 👆 FIN DE LA SOLUCIÓN
      
      let formatoBD = data.formato ? data.formato.toUpperCase().trim() : '';
      if (!this.formatosPermitidos.includes(formatoBD)) {
        formatoBD = ''; 
      }
      // 👇 CAPTURAMOS LA RUTA DE LA IMAGEN DE LA BASE DE DATOS
      this.imageUrl = data.rutaImagen || '';

      this.form.patchValue({
        codigo: data.idAImagenes,
        fechaAnalisis: fechaOriginal, // Pasamos la fecha corregida
        formato: formatoBD,
        defectos: data.defectosEncontrados,
        estado: String(data.estado), 
        loteCodigo: data.loteId
      });
    });
  }
  obtenerUrlImagen(): string {
    if (!this.imageUrl) return '';
    // Limpiamos la ruta por si viene con barras invertidas de Windows (\)
    const rutaLimpia = this.imageUrl.replace(/\\/g, '/');
    // Le pegamos tu ruta base del backend
    return `http://localhost:8080/${rutaLimpia}`;
  }
}
