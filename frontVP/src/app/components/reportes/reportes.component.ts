import { Component } from '@angular/core';
import { CitasaporfechaComponent } from './citasporfecha/citasaporfecha.component';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [RouterOutlet, CitasaporfechaComponent],
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.css'
})
export class ReportesComponent {
  constructor(public route: ActivatedRoute) {}
}
