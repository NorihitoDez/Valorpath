import { Component } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { catchError, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { Eventt } from '../../../models/Eventt';
import { EventService } from '../../../services/event.service';

@Component({
  selector: 'app-listarevent',
  standalone: true,
  imports: [MatTableModule, CommonModule, MatIconModule, RouterModule],
  templateUrl: './listarevent.component.html',
  styleUrl: './listarevent.component.css'
})
export class ListareventComponent {
  dataSource: MatTableDataSource<Eventt> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5' , 'c6' ,'accion01','accion02'];
  mensaje: string = '';

  constructor(private eS: EventService) {}
  ngOnInit(): void {
    this.eS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.eS.getlist().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  
  eliminar(id:number){
    this.eS.delete(id).subscribe(data=>{
      this.eS.list().subscribe(data=>{
        this.eS.setlist(data);
      })
    })
  }
}
