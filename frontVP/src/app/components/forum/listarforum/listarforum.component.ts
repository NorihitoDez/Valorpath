import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ForumService } from '../../../services/forum.service';
import { Forum } from '../../../models/Forum';

@Component({
  selector: 'app-listarforum',
  standalone: true,
  imports: [MatTableModule,MatPaginatorModule],
  templateUrl: './listarforum.component.html',
  styleUrl: './listarforum.component.css'
})
export class ListarforumComponent implements OnInit {
  dataSource: MatTableDataSource<Forum> = new MatTableDataSource();
  displayedColumns: string[] = ["c1", "c2", "c3", "c4", "c5"];
   // ViewChild para acceder al paginator
  // Referencia al paginador
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private fS: ForumService) {}
  ngOnInit(): void {
    this.fS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.fS.getlist().subscribe((data)=>{
      this.dataSource = new MatTableDataSource(data);
    })
  }
   // Configurar el paginador en AfterViewInit
   ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

}
