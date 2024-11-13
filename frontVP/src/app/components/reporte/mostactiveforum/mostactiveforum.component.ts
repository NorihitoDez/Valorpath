import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ForumService } from '../../../services/forum.service';
import { QuantityMostActiveForumDTO } from '../../../models/QuantityMostActiveForumDTO';

@Component({
  selector: 'app-mostactiveforum',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './mostactiveforum.component.html',
  styleUrl: './mostactiveforum.component.css'
})
export class MostactiveforumComponent implements OnInit{
  barChartOptions:ChartOptions={//barcahrption es de tip chbt
    responsive: true,
  }
  //2nd varibale
  barChartLabels:string[]=[]
  //3rd vrble
  barChartType:ChartType='bar'
  //4th vrb
  barChartLegend=true
  //5th vrlb
  barChartData:ChartDataset[]=[]
  //genrmao el cnstuct, inyecccion
  a:QuantityMostActiveForumDTO[]=[]
 constructor(private fS:ForumService) { }
 ngOnInit(): void {
  this.fS.getquantityMostactiveForum().subscribe((data)=>{
   this.a=data
    this.barChartLabels=data.map(item=>item.forumTitle)
    this.barChartData=[
      {
        data:data.map(item=>item.numPosts),
        label:'suma de posts',
        backgroundColor:['#0F2027','#203A43','#2C5364'],
        borderColor:['#210f0b'],
        borderWidth:1
      }
    ]
  })

  

}
 }


