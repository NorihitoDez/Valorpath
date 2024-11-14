import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { Forum } from '../../../models/forum';
import { User } from '../../../models/user';
import { ForumService } from '../../../services/forum.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-forum-creaedita',
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
  templateUrl: './forum-creaedita.component.html',
  styleUrl: './forum-creaedita.component.css',
})
export class ForumCreaeditaComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  forum: Forum = new Forum();
  listaUsuariosPsicologos: User[] = [];
  mensaje: string = '';
  id: number = 0;
  edicion: boolean = false;
  fechaminima: Date = new Date();

  constructor(
    private formBuil: FormBuilder,
    private fS: ForumService,
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
      titulo: ['', Validators.required],
      fecha: ['', Validators.required],
      descripcion: ['', Validators.required],
      usuario: ['', Validators.required],
    });

    this.uS.listarPorRol('PSICOLOGO').subscribe((data) => {
      this.listaUsuariosPsicologos = data;
    });

  }

  aceptar(): void {
    if (this.form.valid) {
      this.forum.id = this.form.value.Codigo;
      this.forum.title = this.form.value.titulo;
      this.forum.date = this.form.value.fecha;
      this.forum.description = this.form.value.descripcion;
      this.forum.psychologist = this.form.value.usuario;

      if (this.edicion) {
        this.fS.update(this.forum).subscribe((data) => {
          this.fS.list().subscribe((data) => {
            this.fS.setList(data);
          });
        });
      } else {
        this.fS.insert(this.forum).subscribe((data) => {
          this.fS.list().subscribe((data) => {
            this.fS.setList(data);
          });
        });
      }
      this.router.navigate(['foros']);
    } else {
      this.mensaje = 'Ingrese todos los campos!!';
    }
  }

  init() {
    if (this.edicion) {
      this.fS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.id),
          titulo: new FormControl(data.title),
          fecha: new FormControl(data.date),
          descripcion: new FormControl(data.description),
          usuario: new FormControl(data.psychologist),
        });
      });
    }
  }
}
