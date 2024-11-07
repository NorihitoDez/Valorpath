import { Routes } from "@angular/router";
import path from "path";
import { UserComponent } from "./components/user/user.component";
import { CreaeditauserComponent } from "./components/user/creaeditauser/creaeditauser.component";
import { RoleComponent } from "./components/role/role.component";
import { CreaeditaroleComponent } from "./components/role/creaeditarole/creaeditarole.component";
import { ForumComponent } from "./components/forum/forum.component";
import { CreaeditaforumComponent } from "./components/forum/creaeditaforum/creaeditaforum.component";

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
    ],
  },
];
