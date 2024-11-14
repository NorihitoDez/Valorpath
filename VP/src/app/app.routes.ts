import { Routes } from '@angular/router';
import { UserComponent } from './components/user/user.component';
import { UserCreaeditaComponent } from './components/user/user-creaedita/user-creaedita.component';
import { RolComponent } from './components/rol/rol.component';
import { RolCreaeditaComponent } from './components/rol/rol-creaedita/rol-creaedita.component';
import { AppointmentComponent } from './components/appointment/appointment.component';
import { AppointmentCreaeditaComponent } from './components/appointment/appointment-creaedita/appointment-creaedita.component';
import { ForumComponent } from './components/forum/forum.component';
import { ForumCreaeditaComponent } from './components/forum/forum-creaedita/forum-creaedita.component';
import { PostComponent } from './components/post/post.component';
import { PostCreaeditaComponent } from './components/post/post-creaedita/post-creaedita.component';
import { ReportsComponent } from './components/reports/reports.component';
import { ReportsPostComponent } from './components/reports/reports-post/reports-post.component';
import { RecursosComponent } from './components/recursos/recursos.component';
import { CreaeditarecursosComponent } from './components/recursos/creaeditarecursos/creaeditarecursos.component';
import { UsorecursoComponent } from './components/usorecurso/usorecurso.component';
import { CreaeditausoComponent } from './components/usorecurso/creaeditauso/creaeditauso.component';

export const routes: Routes = [
  {
    path: 'usuarios',
    component: UserComponent,
    children: [
      {
        path: 'nuevo',
        component: UserCreaeditaComponent,
      },
      {
        path: 'ediciones/:id',
        component: UserCreaeditaComponent,
      },
    ],
  },
  {
    path: 'roles',
    component: RolComponent,
    children: [
      {
        path: 'nuevo',
        component: RolCreaeditaComponent,
      },
      {
        path: 'ediciones/:id',
        component: RolCreaeditaComponent,
      },
    ],
  },
  {
    path: 'citas',
    component: AppointmentComponent,
    children: [
      {
        path: 'nuevo',
        component: AppointmentCreaeditaComponent,
      },
      {
        path: 'ediciones/:id',
        component: AppointmentCreaeditaComponent,
      },
    ],
  },
  {
    path: 'foros',
    component: ForumComponent,
    children: [
      {
        path: 'nuevo',
        component: ForumCreaeditaComponent,
      },
      {
        path: 'ediciones/:id',
        component: ForumCreaeditaComponent,
      },
    ],
  },
  {
    path: 'publicaciones',
    component: PostComponent,
    children: [
      {
        path: 'nuevo',
        component: PostCreaeditaComponent,
      },
      {
        path: 'ediciones/:id',
        component: PostCreaeditaComponent,
      },
    ],
  },
  {
    path:'recursos',
    component: RecursosComponent,
    children:[
      {
        path: 'nuevo',
        component: CreaeditarecursosComponent
      },
      {
        path:'ediciones/:id',
        component: CreaeditarecursosComponent
      }
    ]
  },
  {
    path:'usorecurso',
    component: UsorecursoComponent,
    children:[
      {
        path: 'nuevo',
        component: CreaeditausoComponent
      },
      {
        path:'ediciones/:id',
        component: CreaeditausoComponent
      }
    ]
  },
  {
    path:'reportes',component:ReportsComponent,
    children:[
      {
        path:'cantidad',component:ReportsPostComponent
      }
    ]
  }
];
