import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListareventTypeComponent } from './listarevent-type/listarevent-type.component';

@Component({
  selector: 'app-event-type',
  standalone: true,
  imports: [RouterOutlet,ListareventTypeComponent],
  templateUrl: './event-type.component.html',
  styleUrl: './event-type.component.css'
})
export class EventTypeComponent {
  constructor(public route: ActivatedRoute){}

}
