import { Component } from '@angular/core';
import { ListareventTypeComponent } from './listarevent-type/listarevent-type.component';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { EventType } from '../../models/event-type';

@Component({
  selector: 'app-event-type',
  standalone: true,
  imports: [ListareventTypeComponent, RouterOutlet],
  templateUrl: './event-type.component.html',
  styleUrl: './event-type.component.css'
})
export class EventTypeComponent {

  constructor(public route: ActivatedRoute){}
}
