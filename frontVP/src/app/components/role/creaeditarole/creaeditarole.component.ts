import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { User } from "../../../models/user";
import { Role } from "../../../models/role";
import { RoleService } from "../../../services/role.service";
import { UserService } from "../../../services/user.service";
import { Router } from "@angular/router";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: "app-creaeditarole",
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatDividerModule,
    MatIconModule
  ],
  templateUrl: "./creaeditarole.component.html",
  styleUrl: "./creaeditarole.component.css",
})
export class CreaeditaroleComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  listaUsuarios: User[] = [];
  role: Role = new Role();

  listaRoles: { value: string; viewValue: string }[] = [
    { value: 'PSICOLOGO', viewValue: 'PSICOLOGO' },
    { value: 'VETERANO', viewValue: 'VETERANO' },
    { value: 'ADMINISTRADOR', viewValue: 'ADMINISTRADOR' },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private rS: RoleService,
    private uS: UserService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      hnombre: ["", Validators.required],
      hrole: ["", Validators.required],
      husuarios: ["", Validators.required],
    });
    this.uS.list().subscribe((data) => {
      this.listaUsuarios = data;
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.role.nameRole = this.form.value.hnombre;
      this.role.user.id = this.form.value.husuarios;

      this.rS.insert(this.role).subscribe((data) => {
        this.rS.list().subscribe((data) => {
          this.rS.setlist(data);
        });
      });
      this.router.navigate(["roles"]);
    }
  }
}
