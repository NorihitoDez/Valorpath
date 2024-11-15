import { Component, OnInit } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user';

@Component({
  selector: 'app-creaeditauser',
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
  templateUrl: './creaeditauser.component.html',
  styleUrls: ['./creaeditauser.component.css'],
})
export class CreaeditauserComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  user: User = new User(); // Contiene los datos del usuario
  mensaje: string = '';
  id: number = 0;
  edicion: boolean = false;
  habilitado: { value: boolean; viewValue: string }[] = [
    { value: true, viewValue: 'Enabled' },
    { value: false, viewValue: 'Disabled' },
  ];

  constructor(
    private formBuilder: FormBuilder, // Para construir y validar el formulario
    private uS: UserService, // Servicio de usuario
    private router: Router, // Para navegar entre rutas
    private route: ActivatedRoute // Para obtener los parámetros de la ruta
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = this.id != null;
      this.init();
    });

    this.form = this.formBuilder.group({
      hcodigo: [''],
      hdni: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
      hnombre: [
        '',
        [Validators.required, Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚÑñ]+$/)],
      ],
      hapellidos: [
        '',
        [Validators.required, Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚÑñ]+$/)],
      ],
      hcorreo: ['', [Validators.required, Validators.email]],
      hpassword: ['', [Validators.required, Validators.maxLength(200)]],
      hcumpleanios: ['', Validators.required],
      hdireccion: ['', Validators.required],
      henabled: ['', Validators.required],
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
      this.user.id = this.form.value.hcodigo;
      this.user.dni = this.form.value.hdni;
      this.user.username = this.form.value.hnombre;
      this.user.lastname = this.form.value.hapellidos;
      this.user.email = this.form.value.hcorreo;
      this.user.password = this.form.value.hpassword;
      this.user.birthdate = this.form.value.hcumpleanios;
      this.user.address = this.form.value.hdireccion;
      this.user.enabled = this.form.value.henabled;

      if (this.edicion) {
        this.uS.update(this.user).subscribe((data) => {
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
        this.form = this.formBuilder.group({
          hcodigo: new FormControl (data.id),
          hdni: new FormControl (data.dni),
          hnombre: new FormControl (data.username),
          hapellidos: new FormControl (data.username),
          hcorreo: new FormControl (data.email),
          hpassword: new FormControl (data.password),
          hcumpleanios: new FormControl (data.birthdate),
          hdireccion: new FormControl (data.address),
          henabled: new FormControl (data.enabled),
        });
      });
    }
  }
}
