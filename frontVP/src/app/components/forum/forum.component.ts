import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from "@angular/router";
import { ListarforumComponent } from "./listarforum/listarforum.component";

@Component({
  selector: 'app-forum',
  standalone: true,
  imports: [RouterOutlet, ListarforumComponent],
  templateUrl: './forum.component.html',
  styleUrl: './forum.component.css'
})
export class ForumComponent {
  constructor(public route: ActivatedRoute) {}
}
