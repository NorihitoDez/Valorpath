import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { PostService } from '../../../services/post.service';

@Component({
  selector: 'app-reports-post',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './reports-post.component.html',
  styleUrl: './reports-post.component.css'
})
export class ReportsPostComponent implements OnInit {

  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];
  constructor(private pS: PostService) {}
  ngOnInit(): void {
    this.pS.getQuantityPost().subscribe((data) => {
      this.barChartLabels=data.map(item=>item.username)
      this.barChartData=
      [
        {
          data:data.map(item=>item.quantityPosts),
          label:'Cantidad de publicaciones',
          backgroundColor:['#ee3007','#f08e79','#e98215'],
          borderColor:'#e94215',
          borderWidth:1
        }
      ]
    });
  }
}
