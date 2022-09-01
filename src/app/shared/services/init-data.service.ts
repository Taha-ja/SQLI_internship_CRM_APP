import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from 'src/app/_interfaces/User.model';
import { DashboardService } from './dashboard.service';

@Injectable({
  providedIn: 'root'
})
export class InitDataService {
  // private Data: User={firstname:"firstname",lastname:"lastname",email:"email",userImage:"../../assets/images/unkown.jfif"};
  // private Data:any;
  // private urlImage:any;
  private userSubject: BehaviorSubject<User>;
  user: any;
  Data:any;
  constructor(private http: HttpClient,private dashService:DashboardService) { }
  // public getData(){
  //   return this.urlImage;
  // }
  public getUser(){
    return this.userSubject?.value;
  }
  public getData(){
    return this.Data;
  }
  // load(){
  //   return new Promise((resolve, reject) => {
  //     this.http.get<any>('https://localhost:7290/api/Crm/profilePicture',{
  //       headers: new HttpHeaders({ "Authorization": `Bearer ${localStorage.getItem("jwt")}`})
  //   })
  // //   .subscribe(response => {
  // //     this.Data = response.value[0].entityimage;
  // //     resolve(true);
  // // })
  // .subscribe({
  //   next:(responce)=>{
  //     this.Data=responce.value[0];
  //       this.urlImage="data:image/png;base64,"+this.Data.entityimage;
  //       resolve(true);
  //   }
  // })
  // })
  // }
  getDashboardData(){
    const token =localStorage.getItem('jwt');

    if(!token || token == null){
      return of(undefined);
      // return new Promise((resolve)=>resolve(true));
    }
    return new Promise((resolve, reject) => {
      this.http.get<User>('https://localhost:7290/api/Dashboard/opportunitiesEstimatedRevenue',{
        headers: new HttpHeaders({ "Authorization": `Bearer ${localStorage.getItem("jwt")}`})
    })
  //   .subscribe(response => {
  //     this.Data = response.value[0].entityimage;
  //     resolve(true);
  // })
  .subscribe({
    next:(responce)=>{
      this.Data=responce;
      resolve(true);
    }
  })
  })




  }
  geCurrentUser(){
    const token =localStorage.getItem('jwt');
    if(!token || token == null){
      return of(undefined);
      // return new Promise((resolve)=>resolve(true));
    }
    else return new Promise((resolve, reject) => {
      this.http.get<User>('https://localhost:7290/api/Auth/me',{
        headers: new HttpHeaders({ "Authorization": `Bearer ${localStorage.getItem("jwt")}`})
    })
  //   .subscribe(response => {
  //     this.Data = response.value[0].entityimage;
  //     resolve(true);
  // })
  .subscribe({
    next:(responce)=>{
      this.userSubject =new BehaviorSubject<User>(responce);
      this.user =this.userSubject.asObservable();
      resolve(true);
    }
  })
  })
  }
}
