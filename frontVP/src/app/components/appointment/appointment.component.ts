import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { AppointmentListarComponent } from "./appointment-listar/appointment-listar.component";

@Component({
  selector: 'app-appointment',
  standalone: true,
  imports: [RouterOutlet, AppointmentListarComponent],
  templateUrl: './appointment.component.html',
  styleUrl: './appointment.component.css'
})
export class AppointmentComponent {
  constructor(public route:ActivatedRoute) {}
}
