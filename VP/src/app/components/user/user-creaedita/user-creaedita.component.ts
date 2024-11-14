import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-user-creaedita',
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
  templateUrl: './user-creaedita.component.html',
  styleUrl: './user-creaedita.component.css',
})
export class UserCreaeditaComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  user: User = new User(); //trae toda la data
  mensaje: string = '';
  id: number = 0;
  edicion: boolean = false;
  habilitado: { value: boolean; viewValue: string }[] = [
    { value: true, viewValue: 'Enabled' },
    { value: false, viewValue: 'Disabled' },
  ];

  constructor(
    private formBuil: FormBuilder, 
    private uS: UserService, 
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    this.form = this.formBuil.group({
      codigo: [''],
      dni: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
      nombre: [
        '',
        [Validators.required, Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚÑñ]+$/)],
      ],
      apellidos: [  
        '',
        [Validators.required, Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚÑñ]+$/)],
      ],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.maxLength(200)]],
      cumpleanios: ['', Validators.required],
      direccion: ['', Validators.required],
      enabled: ['', Validators.required],
    });
  }
  onlyNumbers(event: KeyboardEvent) {
    const charCode = event.charCode;
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }

  aceptar(): void {
    if (this.form.valid) {
      this.user.id = this.form.value.codigo;
      this.user.dni = this.form.value.dni;
      this.user.username = this.form.value.nombre;
      this.user.lastname = this.form.value.apellidos;
      this.user.email = this.form.value.correo;
      this.user.password = this.form.value.password;
      this.user.birthdate = this.form.value.cumpleanios;
      this.user.address = this.form.value.direccion;
      this.user.enabled = this.form.value.enabled;

      if (this.edicion) {
        this.uS.update(this.user).subscribe(() => {
          this.uS.list().subscribe((data) => {
            this.uS.setList(data);
          });
        });
      } else {
        this.uS.insert(this.user).subscribe((data) => {
          this.uS.list().subscribe((data) => {
            this.uS.setList(data); 
          });
        });
      }
      this.router.navigate(['usuarios']); 
    } else {
      this.mensaje = 'Complete todos los campos, revise!!';
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
      this.uS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.id),
          dni: new FormControl(data.dni),
          nombre: new FormControl(data.username),
          apellidos: new FormControl(data.lastname),
          correo: new FormControl(data.email),
          password: new FormControl(data.password),
          cumpleanios: new FormControl(data.birthdate),
          direccion: new FormControl(data.address),
          enabled: new FormControl(data.enabled),
        });
      });
    }
  }
}
