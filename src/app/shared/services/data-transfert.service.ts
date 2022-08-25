import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/_interfaces/User.model';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class DataTransfertService implements OnInit{
  public Id:string;
  private email:string;
  private firstname:string;
  private lastname:string;
  private teamProfile:string;
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;
  private currentUser:string;
  constructor(private authService:AuthenticationService) {
    // this.authService.getMe("api/Auth/me").subscribe(
    //   {
    //     next:(responce:User)=>{
    //       this.currentUser='{"id":'+'"'+responce.id+'"'+',"firstname":'+'"'+responce.firstname+'"'+
    //       ',"lastname":'+'"'+responce.lastname+'"'+',"email":'+'"'+responce.email+'"'+',"isPrimary":'+'"'+responce.isPrimary+'"'+'}';
    //       this.userSubject =new BehaviorSubject<User>(responce);
    //     },
    //     complete:()=>{
    //       // this.userSubject =new BehaviorSubject<User>(JSON.parse(this.currentUser));
    //       this.user = this.userSubject.asObservable();
    //     }
    //   }
    // )
  }
  ngOnInit(){
    // this.authService.getMe("api/Auth/me").subscribe(
    //   {
    //     next:(responce:User)=>{
    //       this.currentUser='{"id":'+'"'+responce.id+'"'+',"firstname":'+'"'+responce.firstname+'"'+
    //       ',"lastname":'+'"'+responce.lastname+'"'+',"email":'+'"'+responce.email+'"'+',"isPrimary":'+'"'+responce.isPrimary+'"'+'}';

    //     },
    //     complete:()=>{
    //       this.userSubject =new BehaviorSubject<User>(JSON.parse(this.currentUser));
    //       this.user = this.userSubject.asObservable();
    //       console.log("init "+this.userSubject)
    //     }
    //   }
    // )
  }
  getCurrentUser(){
    this.authService.getMe("api/Auth/me").subscribe(
      {
        next:(responce:User)=>{
          this.currentUser='{"id":'+'"'+responce.id+'"'+',"firstname":'+'"'+responce.firstname+'"'+
          ',"lastname":'+'"'+responce.lastname+'"'+',"email":'+'"'+responce.email+'"'+',"isPrimary":'+'"'+responce.isPrimary+'"'+'}';
          this.userSubject =new BehaviorSubject<User>(responce);
        },
        complete:()=>{
          // this.userSubject =new BehaviorSubject<User>(JSON.parse(this.currentUser));
          this.user = this.userSubject.asObservable();
        }
      }
    )
    // return this.userSubject;
  }
  public get userValue(){
    return this.userSubject.value;
}
  setEmail(email :string){
    this.email=email;
  }
  getEmail(){
    return this.email;
  }
  setTeamProfile(teamProfile :string){
    this.teamProfile=teamProfile;
  }
  getTeamProfile(){
    return this.teamProfile;
  }
  
  setfirstname(firstname :string){
    this.firstname=firstname;
  }
  getfirstname(){
    console.log('from get email '+this.email)
    return this.firstname;
  }
  setlastname(lastname :string){
    this.lastname=lastname;
  }
  getlastname(){
    console.log('from get email '+this.email)
    return this.lastname;
  }
}
