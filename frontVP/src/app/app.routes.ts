import { Routes } from '@angular/router';
import path from 'path';
import { UserComponent } from './components/user/user.component';
import { CreaeditauserComponent } from './components/user/creaeditauser/creaeditauser.component';
import { RoleComponent } from './components/role/role.component';
import { CreaeditaroleComponent } from './components/role/creaeditarole/creaeditarole.component';
import { RecursosComponent } from './components/recursos/recursos.component';
import { CreaeditarecursosComponent } from './components/recursos/creaeditarecursos/creaeditarecursos.component';

export class StaticLandingComponent {}

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
  path:'recursos',
  component:RecursosComponent,
  children:[
    {
      path:'nuevo',
      component: CreaeditarecursosComponent,
    },
    {
      path:'ediciones/:id',
      component: CreaeditarecursosComponent
    }

  ]
}
];