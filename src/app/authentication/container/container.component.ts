import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTransfertService } from 'src/app/shared/services/data-transfert.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {
  id:number;
  email:string;
  constructor(private activeRoute: ActivatedRoute,
    private dataTransfertService: DataTransfertService,
    private router: Router,
    ) {

  }

  ngOnInit(){
    this.logOrReg()
  }
  logOrReg(){
    this.activeRoute.params.subscribe(params=>{
      let id = params['id'];
      this.id=id;
      this.email=this.dataTransfertService.getEmail() 
      if (id == 2 && this.email== null) {
        this.router.navigateByUrl('/authentication/auth/0');
        this.email=null;
      }
    });
   // this.id=this.activeRoute.snapshot.params['id']
  }
}
