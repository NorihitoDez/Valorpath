import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {Role } from '../../../models/role';
import { User } from '../../../models/user';
import { RolService } from '../../../services/role.service';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rol-creaedita',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    CommonModule,
  ],
  templateUrl: './rol-creaedita.component.html',
  styleUrl: './rol-creaedita.component.css',
})
export class RolCreaeditaComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  role: Role = new Role();
  mensaje: string = '';
  id: number = 0;
  edicion: boolean = false;
  tiposRoles: { value: string; viewValue: string }[] = [
    { value: 'PSICOLOGO', viewValue: 'PSICOLOGO' },
    { value: 'VETERANO', viewValue: 'VETERANO' },
    { value: 'ADMINISTRADOR', viewValue: 'ADMINISTRADOR' },
  ];
  listaUsers: User[] = [];

  idUserSeleccionado: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private rS: RolService,
    private uS: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    this.form = this.formBuilder.group({
      codigo: [''],
      roles: ['', Validators.required],
      usuarios: ['', Validators.required],
    });
    this.uS.list().subscribe((data) => {
      this.listaUsers = data;
    });
  }
  aceptar(): void {
    if (this.form.valid) {
      this.role.idRole = this.form.value.codigo;
      this.role.nameRole = this.form.value.roles;
      this.role.user = this.form.value.usuarios;

      if (this.edicion) {
        this.rS.update(this.role).subscribe(() => {
          this.rS.list().subscribe((data) => {
            this.rS.setList(data);
          });
        });
      } else {
        this.rS.insert(this.role).subscribe(() => {
          this.rS.list().subscribe((data) => {
            this.rS.setList(data);
          });
        });
      }
      this.router.navigate(['roles']);
    } else {
      this.mensaje = 'Ingrese todos los campos!!';
    }
  }

  obtenerControlCampo(nombreCampo: string): AbstractControl {
    const control = this.form.get(nombreCampo);
    if (!control) {
      throw new Error(`Control no encontrado para el campo ${nombreCampo}`);
    }
    return control;
  }

  init() {
    if (this.edicion) {
      this.rS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idRole),
          roles: new FormControl(data.nameRole),
          usuarios: new FormControl(data.user.id),
        });
      });
    }
  }
}
