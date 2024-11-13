import { Component, OnInit } from "@angular/core";
import { ChartDataset, ChartOptions, ChartType } from "chart.js";
import { ForumService } from "../../../services/forum.service";
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: "app-quantityforumxpsy",
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: "./quantityforumxpsy.component.html",
  styleUrl: "./quantityforumxpsy.component.css",
})
export class QuantityforumxpsyComponent implements OnInit{
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = [];
  //3rd vrble
  barChartType: ChartType = "doughnut";
  //4th vrb
  barChartLegend = true;
  //5th vrlb
  barChartData: ChartDataset[] = [];
  constructor(private fS: ForumService) {}
  ngOnInit(): void {
    this.fS.getquantityForumbyPsi().subscribe((data)=>{
      this.barChartLabels=data.map(item=>item.psychologistname)
      this.barChartData=[
        {
          data:data.map(item=>item.forumCount),
          label:'cantidad de foros por psicologo',
          backgroundColor:['#0F2027','#203A43','#2C5364'],
          borderColor:['#210f0b'],
          borderWidth:1
        }
      ]
    })
  }
}
