import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { QuantityVeteraninEventDTO } from '../../../models/QuantityVeteraninEventDTO';
import { EventService } from '../../../services/event.service';
@Component({
  selector: 'app-reportequantityveteraninevent',
  standalone: true,
  imports: [MatTableModule, MatIconModule, RouterModule, CommonModule],
  templateUrl: './reportequantityveteraninevent.component.html',
  styleUrl: './reportequantityveteraninevent.component.css'
})
export class ReportequantityveteranineventComponent implements OnInit{
  dataSource: MatTableDataSource<QuantityVeteraninEventDTO> = new MatTableDataSource();
    displayedColumns: string[] = ['Name', 'quantityVeterans'];

    constructor(private eS: EventService) {}
    ngOnInit(): void {
        this.eS.getQuantityVeteraninEvent().subscribe((data) => {
            this.dataSource = new MatTableDataSource(data);
        });
    }

}
