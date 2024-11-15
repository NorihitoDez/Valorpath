import { Component, OnInit, ViewChild } from '@angular/core';
import { EventTypeService } from '../../../services/event-type.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormField } from '@angular/material/form-field';
import { RouterLink, RouterModule } from '@angular/router';
import { EventType } from '../../../models/event-type';
import { MatPaginator } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { catchError, of } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listarevent-type',
  standalone: true,
  imports: [MatTableModule, MatFormField, RouterLink, MatIconModule, CommonModule, RouterModule],
  templateUrl: './listarevent-type.component.html',
  styleUrl: './listarevent-type.component.css'
})
export class ListareventTypeComponent implements OnInit{

  dataSource: MatTableDataSource<EventType> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns:string[]=['c1','c2','c3','accion01','accion02']
  mensaje: string = '';

  constructor(private etS: EventTypeService){}
  ngOnInit(): void {
    this.etS.list().subscribe((data)=>{
      this.dataSource= new MatTableDataSource(data);

    })

    this.etS.getList().subscribe((data)=>{
      this.dataSource = new MatTableDataSource(data);
    });
  }

  eliminar(id: number) {
    this.etS.delete(id).pipe(
      catchError((error) => {
        this.mensaje = 'No se puede eliminar, tiene eventos registrados.';
        this.ocultarMensaje()
        return of(null); 
       
      })
    ).subscribe((data) => {
    
        this.etS.list().subscribe((data) => {
          this.etS.setlist(data);        
        });
      
  
    });
  }
  ocultarMensaje() {
    setTimeout(() => {
      this.mensaje = '';
    }, 3000); 
  }

}
