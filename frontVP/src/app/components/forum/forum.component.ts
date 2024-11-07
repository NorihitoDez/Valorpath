import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-forum',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './forum.component.html',
  styleUrl: './forum.component.css'
})
export class ForumComponent {
  constructor(public route: ActivatedRoute) {}
}
