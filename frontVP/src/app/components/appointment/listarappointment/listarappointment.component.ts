import { Component, OnInit, ViewChild } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { RouterLink } from "@angular/router";
import { Appointment } from "../../../models/appointment";
import { AppointmentService } from "../../../services/appointment.service";

@Component({
  selector: "app-listarappointment",
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
  templateUrl: "./listarappointment.component.html",
  styleUrl: "./listarappointment.component.css",
})
export class ListarappointmentComponent implements OnInit {
  dataSource: MatTableDataSource<Appointment> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  displayedColumns: string[] = [
    "codigo",
    "nombre",
    "fecha",
    "estado",
    "veterano",
    "psicologo",
    "accion01",
    "accion02",
  ];
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
    this.aS.delete(id).subscribe((data) => {
      this.aS.list().subscribe((data) => {
        this.aS.setList(data);
      });
    });
  }
}
