import { Component, OnInit } from "@angular/core";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { RecursosService } from "../../../services/recursos.service";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import { recursos } from "../../../models/recursos";

@Component({
  selector: "app-listarecursos",
  standalone: true,
  imports: [
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    RouterLink
  ],
  templateUrl: "./listarecursos.component.html",
  styleUrl: "./listarecursos.component.css",
})
export class ListarecursosComponent implements OnInit {
  datos: recursos[] = [];
  constructor(private rs: RecursosService) { 
  }

  ngOnInit(): void {
    this.rs.list().subscribe((data) => {
      
      this.datos = data;
    });
    this.rs.getList().subscribe((data) => {
      this.datos=data;
    });
  }
  eliminar(id: number) {
    const confirmacion = confirm('¿Estás seguro de que deseas eliminar este recurso?');
    if (confirmacion) {
      this.datos = this.datos.filter((elemento) => elemento.idrecurso !== id);
      this.rs.delete(id).subscribe({
        next: () => {
         
          this.rs.getList().subscribe((data) => {
            this.datos = data; 
            alert('Recurso eliminado');
          });
        },
        error: (err) => {
          console.error('Error al eliminar el recurso:', err);
        },
      });
    }
  }
}
