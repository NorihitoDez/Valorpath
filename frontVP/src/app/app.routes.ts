import { Routes } from "@angular/router";
import path from "path";
import { UserComponent } from "./components/user/user.component";
import { CreaeditauserComponent } from "./components/user/creaeditauser/creaeditauser.component";
import { RoleComponent } from "./components/role/role.component";
import { CreaeditaroleComponent } from "./components/role/creaeditarole/creaeditarole.component";
import { ForumComponent } from "./components/forum/forum.component";
import { CreaeditaforumComponent } from "./components/forum/creaeditaforum/creaeditaforum.component";
import { ReporteComponent } from "./components/reporte/reporte.component";
import { MostactiveforumComponent } from "./components/reporte/mostactiveforum/mostactiveforum.component";
import { AppointmentComponent } from "./components/appointment/appointment.component";
import { AppointmentCreaeditaComponent } from "./components/appointment/appointment-creaedita/appointment-creaedita.component";
import { EventComponent } from "./components/event/event.component";
import { CreaeditaeventComponent } from "./components/event/creaeditaevent/creaeditaevent.component";
import { EventTypeComponent } from "./components/event-type/event-type.component";
import { CreaeditaeventTypeComponent } from "./components/event-type/creaeditaevent-type/creaeditaevent-type.component";
import { PostComponent } from "./components/post/post.component";
import { PostCreaeditaComponent } from "./components/post/post-creaedita/post-creaedita.component";
import { LoginComponent } from "./components/login/login.component";
import { seguridadGuard } from "./guard/seguridad.guard";
import { HomeComponent } from "./components/home/home.component";
import { RegisterComponent } from "./components/register/register.component";
import { LandingComponent } from "./components/landing/landing.component";
import { CitasporfechaComponent } from "./components/reporte/citasporfecha/citasporfecha.component";
import { CitascanceladasComponent } from "./components/reporte/citascanceladas/citascanceladas.component";
import { ReportequantityeventbypsichologistComponent } from "./components/reporte/reportequantityeventbypsichologist/reportequantityeventbypsichologist.component";
import { ReportequantityveteranineventComponent } from "./components/reporte/reportequantityveteraninevent/reportequantityveteraninevent.component";
//export class StaticLandingComponent {}

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'homes',
    component: HomeComponent,
    canActivate: [seguridadGuard], // solo construcciones, se debe agregar a cada uno
  },
  {
    path:'landing',
    component: LandingComponent
},
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
},
  {
    path: "usuarios",
    component: UserComponent,
    children: [
      {
        path: "nuevo",
        component: CreaeditauserComponent,
      },
      {
        path: "ediciones/:id",
        component: CreaeditauserComponent,
      },
    ],
    canActivate: [seguridadGuard],
  },
  {
    path: "roles",
    component: RoleComponent,
    children: [
      {
        path: "nuevo",
        component: CreaeditaroleComponent,
      },
      {
        path: "ediciones/:id",
        component: CreaeditaroleComponent,
      },
    ],
    canActivate: [seguridadGuard],
  },
  //para foros
  {
    path: "foros",
    component: ForumComponent,
    children: [
      {
        path: "nuevo",
        component: CreaeditaforumComponent,
      },
      // Ruta de edición de foros
      {
        path: "ediciones/:id",
        component: CreaeditaforumComponent, // Asegúrate de que la ruta esté bien configurada
      },
    ],
    canActivate: [seguridadGuard],
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
    ],
    canActivate: [seguridadGuard],
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
      
    ],
    canActivate: [seguridadGuard],
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
    ],
    canActivate: [seguridadGuard],
  },
  {
    path:'posts',
    component:PostComponent,
    children:[
      {
        path:'nuevo',
        component: PostCreaeditaComponent,
      },
      {
        path:'ediciones/:id',
        component: PostCreaeditaComponent
      }
    ],
    canActivate: [seguridadGuard],
  },
  {
    path:'reportes',
    component: ReporteComponent,
    children:[
      {
        path:"mostActiveForum",
        component:MostactiveforumComponent,
        
      },
      {
        path:'citasporfecha',
        component: CitasporfechaComponent
      },
      {
        path:'citascanceladas',
        component: CitascanceladasComponent
      },
      {
        path:'EventosxPsicologo',
        component:ReportequantityeventbypsichologistComponent
      },
      {
        path:'VeteranosxEvento',
        component:ReportequantityveteranineventComponent
      }
    ],
    canActivate: [seguridadGuard],
    
  },
];
