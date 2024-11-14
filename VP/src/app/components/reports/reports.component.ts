import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ReportsAppointmentComponent } from "./reports-appointment/reports-appointment.component";

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [RouterOutlet, ReportsAppointmentComponent],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css'
})
export class ReportsComponent {
  constructor(public route: ActivatedRoute) {}
}
