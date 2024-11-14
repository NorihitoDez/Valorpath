import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarecursosComponent } from './listarecursos/listarecursos.component';

@Component({
  selector: 'app-recursos',
  standalone: true,
  imports: [ListarecursosComponent,RouterOutlet],
  templateUrl: './recursos.component.html',
  styleUrl: './recursos.component.css'
})
export class RecursosComponent {
  constructor(public ruta: ActivatedRoute) {}
}
