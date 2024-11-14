import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterLink } from '@angular/router';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import { catchError, of } from 'rxjs';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-user-listar',
  standalone: true,
  imports: [
    MatPaginator,
    MatPaginatorModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    RouterLink,
    NgIf
  ],
  templateUrl: './user-listar.component.html',
  styleUrl: './user-listar.component.css',
})
export class UserListarComponent implements OnInit {

  dataSource: MatTableDataSource<User> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  displayedColumns: string[] = [
    'codigo',
    'dni',
    'nombre',
    'apellidos',
    'correo',
    'cumpleanios',
    'direccion',
    'eliminar',
    'editar',
  ];

  mensaje: string = "";
  constructor(private uS: UserService) {}
  ngOnInit(): void {
    this.uS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.uS.getList().subscribe((data) => { 
      this.dataSource = new MatTableDataSource(data);
    });
  }
  eliminar(id: number) {
    this.uS
      .delete(id)
      .pipe(
        catchError((error) => {
          this.mensaje =
            "No se puede eliminar, tiene datos";
          this.ocultarMensaje();
          return of(null);
        })
      )
      .subscribe((rbData) => {
        this.uS.list().subscribe((rbData) => {
          this.uS.setList(rbData);
        });
      });
  }
  ocultarMensaje() {
    setTimeout(() => {
      this.mensaje = "";
    }, 3000);
  }
}
