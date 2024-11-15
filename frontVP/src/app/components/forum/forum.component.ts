import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ForumListarComponent } from "./forum-listar/forum-listar.component";

@Component({
  selector: 'app-forum',
  standalone: true,
  imports: [RouterOutlet, ForumListarComponent],
  templateUrl: './forum.component.html',
  styleUrl: './forum.component.css'
})
export class ForumComponent {
  constructor(public route:ActivatedRoute) {}
}
