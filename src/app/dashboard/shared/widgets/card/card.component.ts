import { Component, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
@Component({
  selector: 'app-widget-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  
    @Input() label:string;
    @Input() total:string;
    @Input() percentage:string;

  Highcharts = Highcharts;
  chartOptions={}
  constructor() { 
    this.label="";
    this.total="";
    this.percentage="";
  }

  ngOnInit(): void {
    this.chartOptions={
        chart: {
            type: 'area',
            backgroundColor: null,
            borderwidth:0,
            margin:[2,2,2,2],
            height:60,
            width:200,

        },
        title: {
            text: null
        },
        subtitle: {
            text: null
        },
        xAxis: {
            categories: [
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec'
            ],
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: null
            }
        },
        credits:{
        enabled: false
        },
        exporting:{
            enabled:false
        },
        XAxis:{
            labels:{
                enabled:false,
            },
            titre:{
               text:null, 
            },
            startOnTick:false,
            endOnTick:false,
            tickOptions:[]
        },
        YAxis:{
            labels:{
                enabled:false,
            },
            titre:{
               text:null, 
            },
            startOnTick:false,
            endOnTick:false,
            tickOptions:[]
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true,
            outside:true,
            split:true,

        },
      legens:{
        enabled:false,
      },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [{
           data:[71,78,39,66]
      }]
        };
      
        HC_exporting(Highcharts);
        setTimeout(()=>{
          window.dispatchEvent(
            new Event('resize')
           );
        },300)
      
      
    HC_exporting(this.Highcharts)
  }

}

