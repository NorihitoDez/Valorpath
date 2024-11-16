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
import { ForumComponent } from './components/forum/forum.component';
import { ForumCreaeditaComponent } from './components/forum/forum-creaedita/forum-creaedita.component';
import { PostComponent } from './components/post/post.component';
import { Component } from '@angular/core';
import { PostCreaeditaComponent } from './components/post/post-creaedita/post-creaedita.component';
import { AppointmentComponent } from './components/appointment/appointment.component';
import { AppointmentCreaeditaComponent } from './components/appointment/appointment-creaedita/appointment-creaedita.component';
import { ReportesComponent } from './components/reportes/reportes.component';
import { CitasaporfechaComponent } from './components/reportes/citasporfecha/citasaporfecha.component';
import { CitascanceladasComponent } from './components/reportes/citascanceladas/citascanceladas.component';


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
  },
  {
    path:'foros',
    component:ForumComponent,
    children:[
      {
        path:'nuevo',
        component: ForumCreaeditaComponent
      },
      {
        path:'ediciones/:id',
        component:ForumCreaeditaComponent
      }
    ]
  },
  {
    path:'posts',
    component:PostComponent,
    children:[
      {
        path:'nuevo',
        component: PostComponent,
      },
      {
        path:'ediciones/:id',
        component: PostCreaeditaComponent
      }
    ]
  },
  {
    path:'citas',
    component:AppointmentComponent,
    children:[
      {
        path:'nuevo',
        component:AppointmentCreaeditaComponent,
      },
      {
        path:'ediciones/:id',
        component:AppointmentCreaeditaComponent
      }
    ]
  },
  {
    path:'reportes',
    component:ReportesComponent,
    children:[
      {
        path:'citasporfecha',
        component: CitasaporfechaComponent
      },
      {
        path:'citascanceladas',
        component: CitascanceladasComponent
      }
    ]
  }
];
