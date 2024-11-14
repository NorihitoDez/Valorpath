import { Component, ViewChild } from '@angular/core';
import { UsorecursoService } from '../../../services/usorecurso.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { usorecurso } from '../../../models/usorecurso';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-listaruso',
  standalone: true,
  imports: [MatPaginator,
    MatPaginatorModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    RouterLink,],
  templateUrl: './listaruso.component.html',
  styleUrl: './listaruso.component.css'
})
export class ListarusoComponent {
  dataSource: MatTableDataSource<usorecurso> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  displayedColumns: string[] = [
    'codigo',
    'fecha',
    'usuario',
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
}
}
