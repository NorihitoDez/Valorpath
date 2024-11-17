import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { ForumService } from "../../../services/forum.service";
import { Forum } from "../../../models/Forum";
import { catchError, of } from "rxjs";
import { MatIconModule } from "@angular/material/icon";
import { RouterModule } from "@angular/router";
import { Router } from "@angular/router"; // Añadido para redirección
import { MatCardModule } from "@angular/material/card";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: "app-listarforum",
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    RouterModule,
    MatCardModule,
    CommonModule,
    MatButtonModule,
  ],
  templateUrl: "./listarforum.component.html",
  styleUrl: "./listarforum.component.css",
})
export class ListarforumComponent implements OnInit {
  dataSource: MatTableDataSource<Forum> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  mensaje: string = '';

  constructor(private fS: ForumService) {}

  ngOnInit(): void {
    this.fS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  eliminar(id: number): void {
    this.fS
      .delete(id)
      .pipe(
        catchError((error) => {
          this.mensaje = 'No se puede eliminar, tiene datos asociados.';
          this.ocultarMensaje();
          return of(null);
        })
      )
      .subscribe(() => {
        this.fS.list().subscribe((data) => {
          this.dataSource = new MatTableDataSource(data);
          this.dataSource.paginator = this.paginator;
        });
      });
  }

  ocultarMensaje(): void {
    setTimeout(() => {
      this.mensaje = '';
    }, 3000);
  }
}