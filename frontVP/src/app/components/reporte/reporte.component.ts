import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { QuantityforumxpsyComponent } from "./quantityforumxpsy/quantityforumxpsy.component";

@Component({
  selector: 'app-reporte',
  standalone: true,
  imports: [RouterOutlet, QuantityforumxpsyComponent],
  templateUrl: './reporte.component.html',
  styleUrl: './reporte.component.css'
})
export class ReporteComponent {
  constructor(public route:ActivatedRoute){}
}
