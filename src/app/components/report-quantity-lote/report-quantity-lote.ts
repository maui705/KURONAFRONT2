import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { Loteservice } from '../../services/loteservice';
import { BaseChartDirective } from 'ng2-charts';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-report-quantity-lote',
  imports: [BaseChartDirective, MatIconModule],
  templateUrl: './report-quantity-lote.html',
  styleUrl: './report-quantity-lote.css',
})
export class ReportQuantityLote implements OnInit {
  hasData = false;
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  //npm install chart.js ng2-charts
  barChartLegend = true;
  barChartLabels: string[] = [];

  barChartData: ChartDataset[] = [];
  barChartType: ChartType = 'bar';

    constructor(private pS: Loteservice,
    private cdr: ChangeDetectorRef
  ) { }

 ngOnInit(): void {
    this.cdr.detectChanges()
    this.pS.getQuantityByLote().subscribe((data) => {
      if (data.length > 0) {
        this.hasData = true
        this.barChartLabels = data.map((item) => item.variedadCafe);
        this.barChartData = [
          {
            data: data.map((item) => item.quantity),
            label: 'Cantidad cosechada',
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
