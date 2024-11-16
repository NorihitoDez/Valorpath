import { Component, OnInit } from '@angular/core';
import { AppointmentbyDateDTO } from '../../../models/appointmentbyDateDTO';
import { AppointmentService } from '../../../services/appointment.service';
import {MatCardModule} from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { error } from 'console';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-citasaporfecha',
  providers: [provideNativeDateAdapter()],
  standalone: true,
  imports: [
    MatCardModule, 
    CommonModule, 
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    FormsModule  
  ],
  templateUrl: './citasaporfecha.component.html',
  styleUrl: './citasaporfecha.component.css'
})
export class CitasaporfechaComponent implements OnInit{
  selectedDate: string = ''; // Fecha seleccionada como string (formato YYYY-MM-DD)
  appointments: AppointmentbyDateDTO[] = []; // Lista de citas

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit(): void {
    // Establecer la fecha actual como fecha predeterminada
    const today = new Date();
    this.selectedDate = today.toISOString().split('T')[0]; // Formatear como YYYY-MM-DD
    this.fetchAppointments(); // Obtener citas para la fecha actual
  }

  onDateChange(isoDate: string): void {
    const [year, month, day] = isoDate.split('-');
    this.selectedDate = `${day}-${month}-${year}`;
    this.fetchAppointments();
  }

  
  // Método para obtener citas por fecha
  fetchAppointments(): void {
    if (!this.selectedDate || isNaN(new Date(this.selectedDate).getTime())) {
      console.error('Fecha inválida:', this.selectedDate);
      return;
    }

    // Convertir la cadena del datepicker a un objeto Date
    const date = new Date(this.selectedDate);

    this.appointmentService.getAppointmentsByDate(date).subscribe({
      next: (data) => {
        this.appointments = data; // Asignar las citas al arreglo
      },
      error: (err) => {
        console.error('Error al obtener citas:', err);
        this.appointments = []; // Vaciar la lista en caso de error
      }
    });
  }
}