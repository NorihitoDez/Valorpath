import { Routes } from "@angular/router";
import path from "path";
import { UserComponent } from "./components/user/user.component";
import { CreaeditauserComponent } from "./components/user/creaeditauser/creaeditauser.component";
import { RoleComponent } from "./components/role/role.component";
import { CreaeditaroleComponent } from "./components/role/creaeditarole/creaeditarole.component";
import { ForumComponent } from "./components/forum/forum.component";
import { CreaeditaforumComponent } from "./components/forum/creaeditaforum/creaeditaforum.component";
import { ReporteComponent } from "./components/reporte/reporte.component";


export class StaticLandingComponent {}

export const routes: Routes = [
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
  },
  {
    path:'reportes',
    component: ReporteComponent,
  }
];
