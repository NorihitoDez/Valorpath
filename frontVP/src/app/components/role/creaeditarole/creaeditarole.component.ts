import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  ReactiveFormsModule,
} from "@angular/forms";
import { User } from "../../../models/user";
import { Role } from "../../../models/role";
import { RoleService } from "../../../services/role.service";
import { UserService } from "../../../services/user.service";
import { ActivatedRoute, Params, Router, RouterLink } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-creaeditarole",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    RouterLink
  ],
  templateUrl: "./creaeditarole.component.html",
  styleUrls: ["./creaeditarole.component.css"],
})
export class CreaeditaroleComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  listaUsuarios: User[] = [];
  role: Role = new Role();
  id: number = 0;
  edicion: boolean = false;

  listaRoles: { value: string; viewValue: string }[] = [
    { value: "PSICOLOGO", viewValue: "PSICOLOGO" },
    { value: "VETERANO", viewValue: "VETERANO" },
    { value: "ADMINISTRADOR", viewValue: "ADMINISTRADOR" },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private rS: RoleService,
    private uS: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null; // Verifica si `id` existe para activar el modo edición
      this.init();
    });
  
    this.form = this.formBuilder.group({
      hcodigo: [''], // Solo mostrar el ID en modo solo lectura
      hrole: ['', Validators.required],
      husuarios: ['', Validators.required],
    });
  
    // Cargar la lista de usuarios para el select
    this.uS.list().subscribe((data) => {
      this.listaUsuarios = data;
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.role.id = this.form.value.hcodigo; // Asigna el ID solo si está en modo edición
      this.role.nameRole = this.form.value.hrole;
      this.role.user = { id: this.form.value.husuarios } as User;
  
      if (this.edicion) {
        // Modo edición: Actualiza el rol existente
        this.rS.update(this.role).subscribe(() => {
          this.rS.list().subscribe((data) => {
            this.rS.setlist(data);
          });
          this.showMessage("Rol actualizado correctamente");
        });
      } else {
        // Modo creación: Inserta un nuevo rol
        this.rS.insert(this.role).subscribe(() => {
          this.rS.list().subscribe((data) => {
            this.rS.setlist(data);
          });
          this.showMessage("Rol asignado correctamente");
        });
      }
      this.router.navigate(["roles"]);
    } else {
      this.showMessage("Por favor, completa todos los campos obligatorios");
    }
  }
  
  init() {
    if (this.edicion) {
      this.rS.listid(this.id).subscribe((data) => {
        this.form.patchValue({
          hcodigo: data.id,
          hrole: data.nameRole,
          husuarios: data.user.id,
        });
      });
    }
  }

  private showMessage(message: string) {
    this.snackBar.open(message, "Cerrar", { duration: 3000 });
  }
}
