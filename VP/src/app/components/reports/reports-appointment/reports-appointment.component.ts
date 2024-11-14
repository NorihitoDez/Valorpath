import { Component, OnInit } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { AppointmentService } from '../../../services/appointment.service';

@Component({
  selector: 'app-reports-appointment',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './reports-appointment.component.html',
  styleUrl: './reports-appointment.component.css',
})
export class ReportsAppointmentComponent implements OnInit {
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'pie';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];
  constructor(private aS: AppointmentService) {}
  ngOnInit(): void {
    this.aS.getQuantityCitas().subscribe((data) => {
      this.barChartLabels = data.map((item) => item.nameUser);
      this.barChartData = [
        {
          data: data.map((item) => item.quantityAppointmentsAttended),
          label: 'Cantidad de citas',
          backgroundColor: ['#ee3007', '#f08e79', '#e98215'],
          borderColor: '#e94215',
          borderWidth: 1,
        },
      ];
    });
  }
}
