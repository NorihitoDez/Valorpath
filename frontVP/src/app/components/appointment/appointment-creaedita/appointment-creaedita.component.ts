import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Appointment } from '../../../models/appointment';
import { User } from '../../../models/user';
import { AppointmentService } from '../../../services/appointment.service';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-appointment-creaedita',
  standalone: true,
  imports: [
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
  templateUrl: './appointment-creaedita.component.html',
  styleUrl: './appointment-creaedita.component.css',
})
export class AppointmentCreaeditaComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  appointment: Appointment = new Appointment();
  listaUsuariosPsicologos: User[] = [];
  mensaje: string = '';
  id: number = 0;
  edicion: boolean = false;
  userId: number = parseInt(localStorage.getItem('id')!) //puedes devolver nulo o con valor , con ! si o si te dices q tienes user
  veterano: User = new User();
  fechaminima: Date = new Date();

  status: { value: string; viewValue: string }[] = [
    { value: 'Pendiente', viewValue: 'Pendiente' },
    { value: 'Asistida', viewValue: 'Asistida' },
    { value: 'Cancelada', viewValue: 'Cancelada' },
    { value: 'Reprogramada', viewValue: 'Reprogramada' },
  ];

  constructor(
    private formBuil: FormBuilder,
    private aS: AppointmentService,
    private router: Router,
    private route: ActivatedRoute,
    private uS: UserService
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    this.form = this.formBuil.group({
      codigo: [''],
      nombre: ['', Validators.required],
      fecha: ['', Validators.required],
      status: ['', Validators.required],
      usuario: ['', Validators.required],
    });

    this.uS.listarPorRol('PSICOLOGO').subscribe((data) => {
      this.listaUsuariosPsicologos = data;
    });

    this.uS.listId(this.userId).subscribe((data) => {
      this.veterano = data;
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.appointment.id = this.form.value.codigo;
      this.appointment.name = this.form.value.nombre;
      this.appointment.date = this.form.value.fecha;
      this.appointment.status = this.form.value.status;
      this.appointment.psychologist = this.form.value.usuario;
      this.appointment.veteran = this.veterano;

      if (this.edicion) {
        this.aS.update(this.appointment).subscribe((data) => {
          this.aS.list().subscribe((data) => {
            this.aS.setList(data);
          });
        });
      } else {
        this.aS.insert(this.appointment).subscribe((data) => {
          this.aS.list().subscribe((data) => {
            this.aS.setList(data);
          });
        });
      }
      this.router.navigate(['citas']);
    }else {
      this.mensaje = 'Ingrese todos los campos!!';
    }
  }

  init() {
    if (this.edicion) {
      this.aS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.id),
          nombre: new FormControl(data.name),
          fecha: new FormControl(data.date),
          status: new FormControl(data.status),
          usuario: new FormControl(data.psychologist),
        });
      });
    }
  }
}
