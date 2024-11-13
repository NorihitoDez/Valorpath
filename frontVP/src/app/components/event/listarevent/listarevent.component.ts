import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { Event } from '../../../models/event';
import { EventService } from '../../../services/event.service';

@Component({
  selector: 'app-listarevent',
  standalone: true,
  imports: [MatTableModule, MatIconModule, RouterLink],
  templateUrl: './listarevent.component.html',
  styleUrl: './listarevent.component.css'
})
export class ListareventComponent implements OnInit{
  displayedColumns:string[]=['c1','c2','c3', 'c4', 'c5', 'c6','c7','c8', 'accion01', 'accion02']
  dataSource: MatTableDataSource<Event> = new MatTableDataSource

  constructor(private eS: EventService){}
  ngOnInit(): void {
    this.eS.list().subscribe(data=>{
      this.dataSource=new MatTableDataSource(data)
    })
    this.eS.getlist().subscribe(data=>{
      this.dataSource = new MatTableDataSource(data)
    })
  }

  eliminar(id:number){
    this.eS.delete(id).subscribe(()=>{
      this.eS.list().subscribe(data=>{
        this.dataSource = new MatTableDataSource(data);
        this.eS.setlist(data);
      })
    })
  }
}
