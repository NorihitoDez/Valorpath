import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { PostListarComponent } from "./post-listar/post-listar.component";

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [RouterOutlet, PostListarComponent],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent {
  constructor(public route:ActivatedRoute) {}
}
