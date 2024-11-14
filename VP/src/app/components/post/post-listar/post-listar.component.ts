import { Component, OnInit, ViewChild } from '@angular/core';
import { Post } from '../../../models/post';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterLink } from '@angular/router';
import { PostService } from '../../../services/post.service';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-post-listar',
  standalone: true,
  imports: [
    MatPaginator,
    MatPaginatorModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    RouterLink,
  ],
  templateUrl: './post-listar.component.html',
  styleUrl: './post-listar.component.css',
})
export class PostListarComponent implements OnInit {
  dataSource: MatTableDataSource<Post> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  displayedColumns: string[] = [
    'codigo',
    'titulo',
    'comentario',
    'fecha',
    'veterano',
    'foro',
    'eliminar',
    'actualizar',
  ];
  mensaje: string = '';
  constructor(private pS: PostService) {}

  ngOnInit(): void {
    this.pS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.pS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }
  eliminar(id: number) {
    this.pS
      .delete(id)
      .pipe(
        catchError((error) => {
          this.mensaje = 'No se puede eliminar, tiene datos';
          this.ocultarMensaje();
          return of(null);
        })
      )
      .subscribe((rbData) => {
        this.pS.list().subscribe((rbData) => {
          this.pS.setList(rbData);
        });
      });
  }
  ocultarMensaje() {
    setTimeout(() => {
      this.mensaje = '';
    }, 3000);
  }
}
