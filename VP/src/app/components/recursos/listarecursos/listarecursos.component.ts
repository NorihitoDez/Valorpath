import { Component, OnInit } from "@angular/core";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { RecursosService } from "../../../services/recursos.service";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";

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
  datos: any[] = [];
  constructor(private rs: RecursosService) { 
  }

  ngOnInit(): void {
    this.rs.list().subscribe((data) => {
      this.datos = data;
    });
  }
  eliminar(id: number) {
    this.rs.delete(id).subscribe((data) => {
      this.rs.list().subscribe((data) => {
        this.rs.setList(data);
      });
    });
  }
}
