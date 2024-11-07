import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListareventComponent } from './listarevent/listarevent.component';

@Component({
  selector: 'app-event',
  standalone: true,
  imports: [ListareventComponent, RouterOutlet],
  templateUrl: './event.component.html',
  styleUrl: './event.component.css'
})
export class EventComponent {
  constructor (public route: ActivatedRoute){}
}
