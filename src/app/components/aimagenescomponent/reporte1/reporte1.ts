import { ChangeDetectorRef, Component ,OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { Aimagenesservice } from '../../../services/aimagenesservice';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-reporte1',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatCardModule],
  templateUrl: './reporte1.html',
  styleUrl: './reporte1.css',
})
export class Reporte1 implements OnInit {
  dataSource: any[] = [];
  displayedColumns: string[] = ['loteId', 'cantidadImagenes'];
  mensajeError: string = '';
  chart: any; 

  // 2. Inyectamos cdr en el constructor
  constructor(private aiS: Aimagenesservice, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.cargarReporte();
  }

  cargarReporte() {
    this.aiS.cantidadPorLote().subscribe({
      next: (data) => {
        this.dataSource = data;
        
        // 3. Forzamos a Angular a que actualice el HTML inmediatamente (para que cree el canvas)
        this.cdr.detectChanges(); 

        // 4. Usamos setTimeout para darle 1 milisegundo de respiro y dibujar el gráfico de forma segura
        setTimeout(() => {
            this.renderizarGrafico(data);
        }, 0);
      },
      error: (err) => {
        console.error('Error al cargar el reporte', err);
        this.mensajeError = typeof err.error === 'string' 
          ? err.error 
          : 'Aún no hay registros suficientes para mostrar estadísticas de los lotes.';
        this.cdr.detectChanges();
      }
    });
  }

  renderizarGrafico(data: any[]) {
    // Si ya existe un gráfico anterior, lo destruimos para que no se superpongan al actualizar
    if (this.chart) {
        this.chart.destroy();
    }

    const etiquetas = data.map(item => `Lote ${item.loteId}`);
    const valores = data.map(item => item.cantidadImagenes);

    this.chart = new Chart('graficoLotes', {
      type: 'bar', 
      data: {
        labels: etiquetas,
        datasets: [{
          label: 'Imágenes Procesadas por Lote',
          data: valores,
          backgroundColor: '#f44336', 
          borderRadius: 6, 
          barThickness: 40 
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false 
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1 
            }
          }
        }
      }
    });
  }
}
