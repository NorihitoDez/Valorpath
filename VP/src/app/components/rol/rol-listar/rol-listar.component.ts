import { Component, OnInit, ViewChild } from '@angular/core';
import { Role } from '../../../models/role';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { RolService } from '../../../services/role.service';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-rol-listar',
  standalone: true,
  imports: [
    MatPaginator,
    MatPaginatorModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    RouterLink,
    NgIf,
  ],
  templateUrl: './rol-listar.component.html',
  styleUrl: './rol-listar.component.css',
})
export class RolListarComponent implements OnInit {
  dataSource: MatTableDataSource<Role> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  displayedColumns: string[] = [
    'codigo',
    'nombre',
    'usuarios',
    'eliminar',
    'editar',
  ];

  mensaje: string = '';
  constructor(private rS: RolService) {}
  ngOnInit(): void {
    this.rS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.rS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }
  eliminar(id: number) {
    this.rS
      .delete(id)
      .pipe(
        catchError((error) => {
          this.mensaje = 'No se puede eliminar, tiene datos';
          this.ocultarMensaje();
          return of(null);
        })
      )
      .subscribe((rbData) => {
        this.rS.list().subscribe((rbData) => {
          this.rS.setList(rbData);
        });
      });
  }
  ocultarMensaje() {
    setTimeout(() => {
      this.mensaje = '';
    }, 3000);
  }
}
