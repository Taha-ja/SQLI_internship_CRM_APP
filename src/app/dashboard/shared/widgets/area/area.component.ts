import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import { Chart ,registerables} from 'chart.js';


import {
    ChartComponent,
    ApexAxisChartSeries,
    ApexChart,
    ApexFill,
    ApexXAxis,
    ApexDataLabels,
    ApexYAxis,
    ApexTitleSubtitle
  } from "ng-apexcharts";
import { InitDataService } from 'src/app/shared/services/init-data.service';

// HC_exporting(Highcharts);
export type ChartOptions = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    yaxis: ApexYAxis;
    title: ApexTitleSubtitle;
    fill: ApexFill;
    dataLabels: ApexDataLabels;
  };
@Component({
  selector: 'app-widget-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss']
})
export class AreaComponent{
    @ViewChild("chart") chart: ChartComponent;
    public chartOptions: Partial<ChartOptions>;
    Data:any;
    constructor(private initData:InitDataService) {
      this.chartOptions = {
        series: [
          {
            name: "income",
            data: this.generateData()
          },
        //   {
        //     name: "Bubble2",
        //     data: this.generateData(new Date("11 Feb 2017 GMT").getTime(), 20, {
        //       min: 10,
        //       max: 60
        //     })
        //   },
        //   {
        //     name: "Bubble3",
        //     data: this.generateData(new Date("11 Feb 2017 GMT").getTime(), 20, {
        //       min: 10,
        //       max: 60
        //     })
        //   },
        //   {
        //     name: "Bubble4",
        //     data: this.generateData(new Date("11 Feb 2017 GMT").getTime(), 20, {
        //       min: 10,
        //       max: 60
        //     })
        //   }
        ],
        chart: {
          height: 350,
          type: "bubble"
        },
        dataLabels: {
          enabled: false
        },
        fill: {
          opacity: 0.8
        },
        title: {
          text: ""
        },
        xaxis: {
          tickAmount: 4,
          type: "datetime",
          title: {
            text: "Date de fermeture estimée"
          }
        },
        yaxis:{
            title: {
                text: "Revenue estimée"
              }
        }
      };
    }
  
    public generateData() {
      //var i = 0;
   // var series = [[new Date("2022-01-01").getTime(),0,0],[new Date("2022-12-31").getTime(),0,0]];
      var series = [];
      var data=this.initData.getData();
      console.log("dashData :",data);
      
    //   var data=[
    //     {
    //         "x": "2022-01-20",
    //         "y": 24995,
    //         "z": 24995
    //     },
    //     {
    //         "x": "2022-09-10",
    //         "y": 30582,
    //         "z": 30582
    //     },
    //     {
    //         "x": "2022-10-04",
    //         "y": 33800,
    //         "z": 33800
    //     },
    //     {
    //         "x": "2022-10-05",
    //         "y": 33800,
    //         "z": 54800
    //     }
    // ];
    // if(this.Data!=null){
        var min;
        var max
        var Min=[];
        data.forEach(element => {
        var z = element.z;
        Min.push(new Date(element.x).getTime())
        series.push([new Date(element.x).getTime(), element.y,z]);
     });
     min=Math.min(...Min)
     max=Math.max(...Min)
     console.log("min :",min," max :",max);
     
    // }
    //  {
    //     //var x = Math.floor(Math.random() * (750 - 1 + 1)) + 1;
    //     var y =
    //       Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
    //     var z = Math.floor(Math.random() * (75 - 15 + 1)) + 15;
   
    //     baseval += 86400000;
    //     i++;
    //   }
      return series;
    }

    initDataTable() {
        const apiAddress: string = 'api/Dashboard/opportunitiesEstimatedRevenue';
        // OpportunityModel
        // this.dashService.opportunities(apiAddress).subscribe({
        //   next:(responce)=>{
        //     //var result = JSON.parse(JSON.stringify(responce));
        //     this.Data=responce.value;
        //   }   
        // })
        return this.Data
    }


  }
