import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { Post } from '../../../models/post';
import { User } from '../../../models/user';
import { PostService } from '../../../services/post.service';
import { UserService } from '../../../services/user.service';
import { ForumService } from '../../../services/forum.service';
import { Forum } from '../../../models/forum';

@Component({
  selector: 'app-post-creaedita',
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
  templateUrl: './post-creaedita.component.html',
  styleUrl: './post-creaedita.component.css',
})
export class PostCreaeditaComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  post: Post = new Post();
  listaUsuariosVeteranos: User[] = [];
  mensaje: string = '';
  id: number = 0;
  edicion: boolean = false;
  fechaminima: Date = new Date();
  listaForos: Forum[] = [];

  constructor(
    private formBuil: FormBuilder,
    private pS: PostService,
    private router: Router,
    private route: ActivatedRoute,
    private uS: UserService,
    private fS: ForumService
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
      comentario: ['', Validators.required],
      usuario: ['', Validators.required],
      foro: ['', Validators.required],
    });

    this.uS.listarPorRol('VETERANO').subscribe((data) => {
      this.listaUsuariosVeteranos = data;
    });

    this.fS.list().subscribe((data) => {
      this.listaForos = data;
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.post.id = this.form.value.codigo;
      this.post.title = this.form.value.titulo;
      this.post.date = this.form.value.fecha;
      this.post.comment = this.form.value.comentario;
      this.post.veteran = this.form.value.usuario;
      this.post.forum= this.form.value.foro;

      if (this.edicion) {
        this.pS.update(this.post).subscribe((data) => {
          this.pS.list().subscribe((data) => {
            this.pS.setList(data);
          });
        });
      } else {
        this.pS.insert(this.post).subscribe((data) => {
          this.pS.list().subscribe((data) => {
            this.pS.setList(data);
          });
        });
      }
      this.router.navigate(['publicaciones']);
    } else {
      this.mensaje = 'Ingrese todos los campos!!';
    }
  }

  init() {
    if (this.edicion) {
      this.pS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.id),
          titulo: new FormControl(data.title),
          fecha: new FormControl(data.date),
          comentario: new FormControl(data.comment),
          usuario: new FormControl(data.veteran),
          foro: new FormControl(data.forum),
        });
      });
    }
  }
}
