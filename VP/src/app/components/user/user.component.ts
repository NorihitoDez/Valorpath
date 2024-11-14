import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { UserListarComponent } from "./user-listar/user-listar.component";

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [UserListarComponent,RouterOutlet],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  constructor(public route:ActivatedRoute) {}
}
