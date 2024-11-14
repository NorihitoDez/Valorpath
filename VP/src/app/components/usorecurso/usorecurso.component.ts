import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarusoComponent } from "./listaruso/listaruso.component";

@Component({
  selector: 'app-usorecurso',
  standalone: true,
  imports: [RouterOutlet, ListarusoComponent],
  templateUrl: './usorecurso.component.html',
  styleUrl: './usorecurso.component.css'
})
export class UsorecursoComponent {
constructor(public route:ActivatedRoute){}
}
