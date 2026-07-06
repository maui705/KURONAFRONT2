import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Actividadservice } from '../../../services/actividadservice';

@Component({
  selector: 'app-report-actividad-usuario',
  imports: [BaseChartDirective, MatIconModule],
  templateUrl: './report-actividad-usuario.html',
  styleUrl: './report-actividad-usuario.css',
})

export class ReportActividadUsuario implements OnInit{
  hasData = false;

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

    this.aS.getQuantityByActividadUsuario().subscribe({
      next: (data) => {
        if (data.length > 0) {
          this.hasData = true;

          this.barChartLabels = data.map(
            (item) => `${item.nombre} ${item.apellido}`
          );

          this.barChartData = [
            {
              data: data.map((item) => item.quantityActividad2),
              label: 'Cantidad de actividades por usuario',
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