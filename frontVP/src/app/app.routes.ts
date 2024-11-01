import { Routes } from '@angular/router';
import path from 'path';
import { UserComponent } from './components/user/user.component';
import { CreaeditauserComponent } from './components/user/creaeditauser/creaeditauser.component';
import { AppointmentComponent } from './components/appointment/appointment.component';
import { CreaeditaappointmentComponent } from './components/appointment/creaeditaappointment/creaeditaappointment.component';

export const routes: Routes = [
  {
    path: 'usuarios',
    component: UserComponent,
    children: [
      {
        path: 'nuevo',
        component: CreaeditauserComponent,
      },
      {
        path: 'ediciones/:id',
        component: CreaeditauserComponent,
      },
    ],
  },
  {
    path: 'citas',
    component: AppointmentComponent,
    children: [
      {
        path: 'nuevo',
        component: CreaeditaappointmentComponent,
      },
      {
        path: 'ediciones/:id',
        component: CreaeditaappointmentComponent,
      },
    ],
  },
];
