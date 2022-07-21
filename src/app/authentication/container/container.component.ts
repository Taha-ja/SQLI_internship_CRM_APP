import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {
  id:number;
  change:boolean;
  constructor(private activeRoute: ActivatedRoute) {

  }

  ngOnInit(){
    this.logOrReg()
  }
  logOrReg(){
    this.activeRoute.params.subscribe(params=>{
      let id = params['id'];
      this.id=id});
   // this.id=this.activeRoute.snapshot.params['id']
  }
}
