import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { RolCreaeditaComponent } from "./rol-creaedita/rol-creaedita.component";
import { RolListarComponent } from "./rol-listar/rol-listar.component";

@Component({
  selector: 'app-rol',
  standalone: true,
  imports: [RouterOutlet, RolListarComponent],
  templateUrl: './rol.component.html',
  styleUrl: './rol.component.css'
})
export class RolComponent {
  constructor(public route:ActivatedRoute) {}
}
