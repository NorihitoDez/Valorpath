import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { ForumService } from "../../../services/forum.service";
import { Forum } from "../../../models/Forum";
import { catchError, of } from "rxjs";
import { MatIconModule } from "@angular/material/icon";
import { RouterModule } from "@angular/router";
import { Router } from "@angular/router"; // Añadido para redirección

@Component({
  selector: "app-listarforum",
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatIconModule, RouterModule],
  templateUrl: "./listarforum.component.html",
  styleUrl: "./listarforum.component.css",
})
export class ListarforumComponent implements OnInit {
  dataSource: MatTableDataSource<Forum> = new MatTableDataSource();
  displayedColumns: string[] = [
    "c1",
    "c2",
    "c3",
    "c4",
    "c5",
    "accion01",
    "accion02",
  ];
  mensaje: string = ""; // Mensaje de error para eliminar
  // ViewChild para acceder al paginator
  // Referencia al paginador
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private fS: ForumService, private router: Router) {}
  ngOnInit(): void {
    this.fS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.fS.getlist().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      //this.dataSource.paginator = this.paginator; // Configura el paginador aquí*/
      this.dataSource.data = data;
    });
  }
  // Método para cargar la lista de foros
  cargarForos() {
    this.fS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  eliminar(id: number) {
    console.log("Eliminando foro con ID:", id); // Verifica el ID
    if (confirm("¿Estás seguro de que quieres eliminar este foro?")) {
      this.fS
        .delete(id)
        .pipe(
          catchError((error) => {
            this.mensaje =
              "No se puede eliminar este foro, ya que está asociado a otros registros.";
            this.ocultarMensaje();
            return of(null);
          })
        )
        .subscribe((data) => {
          console.log("Respuesta de la eliminación:", data);
          if (data) {
            // Recargar la lista de foros después de la eliminación
            this.cargarForos();
          }
        });
    }
     // Redirige a la lista de foros
     this.router.navigate(["foros"]);
  }
  editar(id: number) {
    this.router.navigate(["/creaeditaforum", id]); // Redirigir al componente de edición
  }
  // Función para ocultar el mensaje de error después de 3 segundos
  ocultarMensaje() {
    setTimeout(() => {
      this.mensaje = "";
    }, 3000);
  }
  // Configurar el paginador en AfterViewInit
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
