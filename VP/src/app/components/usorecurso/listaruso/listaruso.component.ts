import { Component, ViewChild } from '@angular/core';
import { UsorecursoService } from '../../../services/usorecurso.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { usorecurso } from '../../../models/usorecurso';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { recursos } from '../../../models/recursos';

@Component({
  selector: 'app-listaruso',
  standalone: true,
  imports: [MatPaginator,
    MatPaginatorModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    RouterLink,
  CommonModule],
  templateUrl: './listaruso.component.html',
  styleUrl: './listaruso.component.css'
})
export class ListarusoComponent {
  recursoMenosUtilizado: any[]=[];  // Para almacenar el recurso menos utilizado
  mensaje: string = '';
  recurso: recursos[]=[];
  dataSource: MatTableDataSource<usorecurso> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  displayedColumns: string[] = [
    'codigo',
    'fecha',
    'usuario',
    'tiporecurso',
    'recurso',
  ];
constructor(private urs:UsorecursoService){}
ngOnInit(): void {
  this.urs.list().subscribe((data) => {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
  });
  this.urs.getList().subscribe((data) => { 
    this.dataSource = new MatTableDataSource(data);
  });
  this.urs.rmenosutilizado().subscribe(
    (data) => {
      console.log('Datos recibidos del servicio getMenosUtilizados:', data);
      if (Array.isArray(data)) { // Asegúrate de que la respuesta sea un arreglo
        this.recursoMenosUtilizado = data;
      } else {
        console.error('Error: la respuesta no es un arreglo');
      }
    }
  );

}
}
