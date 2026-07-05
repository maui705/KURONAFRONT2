import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { MatIconModule } from '@angular/material/icon';
import { Actividadservice } from '../../../services/actividadservice';
import { BaseChartDirective } from 'ng2-charts';
@Component({
  selector: 'app-report-actividad-lote',
  imports: [BaseChartDirective, MatIconModule],
  templateUrl: './report-actividad-lote.html',
  styleUrl: './report-actividad-lote.css',
})
export class ReportActividadLote implements OnInit {hasData = false;

  barChartOptions: ChartOptions = {
    responsive: true,
  };

  barChartLegend = true;
  barChartLabels: string[] = [];
  barChartData: ChartDataset[] = [];
  barChartType: ChartType = 'bar';

  constructor(
    private aS: Actividadservice,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cdr.detectChanges();

    this.aS.getQuantityByActividadLote().subscribe({
      next: (data) => {
        if (data.length > 0) {
          this.hasData = true;

          this.barChartLabels = data.map((item) => item.variedadCafe);

          this.barChartData = [
            {
              data: data.map((item) => item.quantityActividad),
              label: 'Cantidad de actividades por lote',
              backgroundColor: [
                '#d72b04f5',
                '#f40b03e0',
                'rgb(194, 41, 31)',
                'rgba(230, 77, 77, 0.5)',
                'rgb(148, 14, 4)',
              ],
            },
          ];
        } else {
          this.hasData = false;
        }
      },
      error: () => {
        this.hasData = false;
      },
    });
  }
}