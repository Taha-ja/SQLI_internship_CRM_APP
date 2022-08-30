import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/shared/services/dashboard.service';
import { InitDataService } from 'src/app/shared/services/init-data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
 
  windowWidth:number;
  Data: any=[];
  percentage=String;
  constructor(
      private dashService:DashboardService,
      private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.initDataTable();
  }
  generateFake(count: number): Array<number> {
    const indexes = [];
    for (let i = 0; i < count; i++) {
      indexes.push(i);
    }
    return indexes;
  }
  initDataTable() {
    var initialData = [{statuscode:1, count:0}, {statuscode:3, count:0}, {statuscode:4, count:0} ]
    const apiAddress: string = 'api/Dashboard/opportunitiesStatusCodeCount';
    this.dashService.opportunities(apiAddress).subscribe({
      next:(responce)=>{
        const result =responce.value;
        if (Object.keys(result).length > 0) {
          let allStatusCode = new Set(result.map((d: any)=> d.statuscode));
          this.Data = [...result, ...initialData.filter(d => !allStatusCode.has(d.statuscode))];
          this.Data.sort(function (a: any, b: any) {
            return a.statuscode - b.statuscode;
          });
          this.cdr.markForCheck();
          console.log("data", this.Data);
                  
        }

        // if(this.Data.entityimage!=null){
        //   this.UrlImage="data:image/png;base64,"+this.Data.entityimage;
        // }
        // else{
        //   this.UrlImage="../../../../../assets/images/unkown.jfif";
        // }
      },
      // error:()=>{
      //   setTimeout(_ =>{
      //     var div = document.getElementById('spinner');
      //     div.innerHTML += 'Something is wrong,Please check your network';
      //     this.notFound=true;
      //   },5000);
      // }   
    })
  }
 
}
