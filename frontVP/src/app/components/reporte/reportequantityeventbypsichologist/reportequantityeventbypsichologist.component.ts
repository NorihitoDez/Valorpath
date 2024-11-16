import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { QuantityEventbyPsichologistDTO } from '../../../models/QuantityEventbyPsichologistDTO';
import { EventService } from '../../../services/event.service';

@Component({
  selector: 'app-reportequantityeventbypsichologist',
  standalone: true,
  imports: [MatTableModule, MatIconModule, RouterModule, CommonModule],
  templateUrl: './reportequantityeventbypsichologist.component.html',
  styleUrl: './reportequantityeventbypsichologist.component.css'
})
export class ReportequantityeventbypsichologistComponent implements OnInit{
  dataSource: MatTableDataSource<QuantityEventbyPsichologistDTO> = new MatTableDataSource();
  displayedColumns: string[] = ['psychologist', 'quantityEvents'];

  constructor(private eS: EventService) {}
  ngOnInit(): void {
      this.eS.getQuantityEventbyPsichologist().subscribe((data) => {
          this.dataSource = new MatTableDataSource(data);
      });
  }

}
