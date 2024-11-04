import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { recursos } from '../../../models/recursos';
import { RecursosService } from '../../../services/recursos.service';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-listarecursos',
  standalone: true,
  imports: [MatTableModule,MatCardModule,MatButtonModule,MatIconModule],
  templateUrl: './listarecursos.component.html',
  styleUrl: './listarecursos.component.css'
})
export class ListarecursosComponent implements OnInit{
  datasource:MatTableDataSource<recursos>=new MatTableDataSource();
  constructor(private rs:RecursosService){};
  ngOnInit(): void {
    this.rs.list().subscribe((data=>{
      this.datasource=new MatTableDataSource(data);
    }));
    this.rs.getList().subscribe((data=>{
      this.datasource=new MatTableDataSource(data);
    }));
  }
}
