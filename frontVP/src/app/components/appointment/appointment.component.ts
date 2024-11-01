import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarappointmentComponent } from "./listarappointment/listarappointment.component";

@Component({
  selector: 'app-appointment',
  standalone: true,
  imports: [ListarappointmentComponent,RouterOutlet],
  templateUrl: './appointment.component.html',
  styleUrl: './appointment.component.css'
})
export class AppointmentComponent implements OnInit {

  constructor(public route: ActivatedRoute) {}

  ngOnInit(): void {
    
  }

}
