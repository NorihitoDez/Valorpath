import { Component, OnInit } from "@angular/core";
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { CommonModule, NgIf } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { ActivatedRoute, Params, Router, RouterLink } from "@angular/router";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { User } from "../../models/user";
import { UserService } from "../../services/user.service";
import { Role } from "../../models/role";

@Component({
  selector: "app-register",
  standalone: true,
  imports: [
    MatFormFieldModule,
    NgIf,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    CommonModule,
    RouterLink,
  ],
  templateUrl: "./register.component.html",
  styleUrl: "./register.component.css",
})
export class RegisterComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  user: User = new User(); //trae toda la data
  mensaje: string = "";
  id: number = 0;
  rol: Role = new Role();

  constructor(
    private formBuil: FormBuilder, //donde vas al htlm y validas
    private uS: UserService, //para inyectar y realizar parte del boton ACeptar
    private router: Router, //enrutar
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data["id"];
    });

    this.form = this.formBuil.group({
      codigo: [""],
      dni: ["", [Validators.required, Validators.pattern(/^\d{8}$/)]],
      nombre: [
        "",
        [Validators.required, Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚÑñ]+$/)],
      ],
      apellidos: [
        "",
        [Validators.required, Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚÑñ]+$/)],
      ],
      correo: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.maxLength(200)]],
      cumpleanios: ["", Validators.required],
      direccion: ["", Validators.required],
      rol: ["", Validators.required], // Nuevo campo para el rol
    });
  }
  onlyNumbers(event: KeyboardEvent) {
    const charCode = event.charCode;
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }

  registrar(): void {
    if (this.form.valid) {
      
      this.user.dni = this.form.value.dni;
      this.user.username = this.form.value.nombre;
      this.user.lastname = this.form.value.apellidos;
      this.user.email = this.form.value.correo;
      this.user.password = this.form.value.password;
      this.user.birthdate = this.form.value.cumpleanios;
      this.user.address = this.form.value.direccion;
      
    } else {
      console.log(this.form.value);
      this.user.dni = this.form.value.dni;
      this.user.username = this.form.value.nombre;
      this.user.lastname = this.form.value.apellidos;
      this.user.email = this.form.value.correo;
      this.user.password = this.form.value.password;
      this.user.birthdate = this.form.value.cumpleanios;
      this.user.address = this.form.value.direccion;
      
      this.uS.insert(this.user).subscribe((data) => {
        this.uS.list().subscribe((data) => {
          this.uS.setList(data); // lista nueva a listacambio
        });
      });
      this.router.navigate(['login']);
    }
  }
  obtenerControlCampo(nombreCampo: string): AbstractControl {
    const control = this.form.get(nombreCampo);
    if (!control) {
      throw new Error(`Control no encontrado para el campo ${nombreCampo}`);
    }
    return control;
  }
}
