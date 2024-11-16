import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { CancelledAppointmentsDTO } from '../../../models/CancelledAppointmentDTO';
import { AppointmentService } from '../../../services/appointment.service';


@Component({
  selector: 'app-citascanceladas',
  standalone: true,
  imports: [MatCardModule, 
    CommonModule, 
    MatInputModule,
    MatNativeDateModule,
    FormsModule  ],
  templateUrl: './citascanceladas.component.html',
  styleUrl: './citascanceladas.component.css'
})
export class CitascanceladasComponent implements OnInit {
  cancelledAppointments: CancelledAppointmentsDTO[] = [];

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit(): void {
    this.fetchCancelledAppointments();
  }

  fetchCancelledAppointments(): void {
    this.appointmentService.getCancelledAppointments().subscribe({
      next: (data) => {
        this.cancelledAppointments = data;
      },
      error: (err) => {
        console.error('Error al obtener citas canceladas:', err);
        this.cancelledAppointments = [];
      }
    });
  }

}
