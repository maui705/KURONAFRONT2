import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Cosechaservice } from '../../services/cosechaservice';

@Component({
  selector: 'app-report-quantity-cosecha',
  imports: [BaseChartDirective, MatIconModule],
  templateUrl: './report-quantity-cosecha.html',
  styleUrl: './report-quantity-cosecha.css',
})
export class ReportQuantityCosecha implements OnInit {
  hasData = false;
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  //npm install chart.js ng2-charts
  barChartLegend = true;
  barChartLabels: string[] = [];

  barChartData: ChartDataset[] = [];
  barChartType: ChartType = 'bar';

    constructor(private pS: Cosechaservice,
    private cdr: ChangeDetectorRef
  ) { }

 ngOnInit(): void {
    this.cdr.detectChanges()
    this.pS.getQuantityByCosecha().subscribe((data) => {
      if (data.length > 0) {
        this.hasData = true
        this.barChartLabels = data.map((item) => item.estadoCosecha);
        this.barChartData = [
          {
            data: data.map((item) => item.quantityCosecha),
            label: 'Cantidad de Cosechas Por Estado',
            backgroundColor: [
              '#d72b04f5', // Rojo intenso
              '#f40b03e0', // Rojo estándar

              'rgb(194, 41, 31)', // Rojo oscuro
              'rgba(230, 77, 77, 0.5)', // Rojo claro
              'rgb(148, 14, 4)',
            ],
          },
        ];
      } else {
        this.hasData = false;
      }

    });
  }
}
