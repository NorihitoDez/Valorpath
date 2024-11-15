import { Component, OnInit, ViewChild } from '@angular/core';
import { Appointment } from '../../../models/appointment';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterLink } from '@angular/router';
import { AppointmentService } from '../../../services/appointment.service';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-appointment-listar',
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
  templateUrl: './appointment-listar.component.html',
  styleUrl: './appointment-listar.component.css',
})
export class AppointmentListarComponent implements OnInit {
  dataSource: MatTableDataSource<Appointment> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  displayedColumns: string[] = [
    'codigo',
    'nombre',
    'fecha',
    'estado',
    'veterano',
    'psicologo',
    'eliminar',
    'actualizar',
  ];
  mensaje: string = '';
  constructor(private aS: AppointmentService) {}

  ngOnInit(): void {
    this.aS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.aS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }
  eliminar(id: number) {
    this.aS
      .delete(id)
      .pipe(
        catchError((error) => {
          this.mensaje = 'No se puede eliminar, tiene datos';
          this.ocultarMensaje();
          return of(null);
        })
      )
      .subscribe((rbData) => {
        this.aS.list().subscribe((rbData) => {
          this.aS.setList(rbData);
        });
      });
  }
  ocultarMensaje() {
    setTimeout(() => {
      this.mensaje = '';
    }, 3000);
  }
}
