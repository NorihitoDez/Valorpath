import { Routes } from '@angular/router';
import path from 'path';
import { UserComponent } from './components/user/user.component';
import { CreaeditauserComponent } from './components/user/creaeditauser/creaeditauser.component';
import { RoleComponent } from './components/role/role.component';
import { CreaeditaroleComponent } from './components/role/creaeditarole/creaeditarole.component';
import { LandingComponent } from './components/landing/landing.component';
import { EventTypeComponent } from './components/event-type/event-type.component';
import { CreaeditaeventTypeComponent } from './components/event-type/creaeditaevent-type/creaeditaevent-type.component';
import { ListareventTypeComponent } from './components/event-type/listarevent-type/listarevent-type.component';
import { EventComponent } from './components/event/event.component';
import { CreaeditaeventComponent } from './components/event/creaeditaevent/creaeditaevent.component';

export class StaticLandingComponent {}

export const routes: Routes = [
  {
    path:"",
    component: LandingComponent,
  },
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
    path: 'roles',
    component: RoleComponent,
    children:[
      {
        path:'nuevo',
        component:CreaeditaroleComponent,
      },
      {
        path: 'ediciones/:id',
        component: CreaeditaroleComponent,
      }
    ],
  },
  {
    path: 'tipoevento',
    component: EventTypeComponent,
    children:[
      {
        path:'nuevo',
        component: CreaeditaeventTypeComponent,
      },
      {
        path: 'ediciones/:id',
        component: CreaeditaeventTypeComponent,
      }
    ]
  },
  {
    path:'eventos',
    component: EventComponent,
    children:[
      {
        path:'nuevo',
        component:CreaeditaeventComponent
      },
      {
        path:'ediciones/:id',
        component: CreaeditaeventComponent
      }
      
    ]
  }
];
