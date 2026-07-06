import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { MatIconModule } from '@angular/material/icon';
import { UsuarioService } from '../../../services/usuarioservice';

@Component({
  selector: 'app-report-usuarios-rol',
  imports: [BaseChartDirective, MatIconModule],
  templateUrl: './report-usaurios-rol.html',
  styleUrl: './report-usaurios-rol.css',
})
export class ReportUsuariosRol implements OnInit {
  hasData = false;
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  //npm install chart.js ng2-charts
  barChartLegend = true;
  barChartLabels: string[] = [];

  barChartData: ChartDataset[] = [];
  barChartType: ChartType = 'bar';

    constructor(
    private uS: UsuarioService,
    private cdr: ChangeDetectorRef
  ) { }

 ngOnInit(): void {
    this.cdr.detectChanges()
    this.uS.getQuantitUsuByRol().subscribe((data) => {
      if (data.length > 0) {
        this.hasData = true
        this.barChartLabels = data.map((item) => item.nombreRol);
        this.barChartData = [
          {
            data: data.map((item) => item.quantityUsuarios),
            label: 'Cantidad de usuarios por rol',
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
