import { Component, OnInit, ViewChild } from '@angular/core';
import { Forum } from '../../../models/forum';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterLink } from '@angular/router';
import { ForumService } from '../../../services/forum.service';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-forum-listar',
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
  templateUrl: './forum-listar.component.html',
  styleUrl: './forum-listar.component.css',
})
export class ForumListarComponent implements OnInit {
  dataSource: MatTableDataSource<Forum> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  displayedColumns: string[] = [
    'codigo',
    'titulo',
    'fecha',
    'descripcion',
    'psicologo',
    'eliminar',
    'actualizar',
  ];
  mensaje: string = '';
  constructor(private fS: ForumService) {}

  ngOnInit(): void {
    this.fS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.fS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }
  eliminar(id: number) {
    this.fS
      .delete(id)
      .pipe(
        catchError((error) => {
          this.mensaje = 'No se puede eliminar, tiene datos';
          this.ocultarMensaje();
          return of(null);
        })
      )
      .subscribe((rbData) => {
        this.fS.list().subscribe((rbData) => {
          this.fS.setList(rbData);
        });
      });
  }
  ocultarMensaje() {
    setTimeout(() => {
      this.mensaje = '';
    }, 3000);
  }
}
