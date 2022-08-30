import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/_interfaces/User.model';
import { AuthenticationService } from './authentication.service';
import { Subject } from 'rxjs';
import { DashboardService } from './dashboard.service';
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
  private userPicture :BehaviorSubject<any>;
  public picture;
  public user;
  private currentUser:string;
  private urlImage:any;
  private Data:any;
  public profileImageUpdate$ = new Subject<string>();
  public fullNameUpdate$ = new Subject<string>();

  constructor(private authService:AuthenticationService,private dashService:DashboardService) {
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
          ',"lastname":'+'"'+responce.lastname+'"'+',"email":'+'"'+responce.email+'"'+',"isPrimary":'+'"'+responce.isPrimary+'"'+',"userImage":'+'"'+this.profileImageUpdate$+'"'+'}';
          this.userSubject =new BehaviorSubject<User>(responce);
          // this.userSubject =new BehaviorSubject<User>(JSON.parse(this.currentUser));
          this.user =this.userSubject.asObservable();
        },
        // complete:()=>{
        //   // this.userSubject =new BehaviorSubject<User>(JSON.parse(this.currentUser));
        //   this.user = this.userSubject.asObservable();
        // }
      }
    )
    // return this.userSubject;

  }
  getPicture(){
    const apiAddress: string = 'api/Crm/profilePicture';
    this.dashService.opportunities(apiAddress).subscribe({
      next:(responce)=>{
        this.Data=responce.value[0];

        if(this.Data.entityimage!=null){
          this.urlImage="data:image/png;base64,"+this.Data.entityimage;
        }
        else{
          this.urlImage="../../../../../assets/images/unkown.jfif";
        }
      }
    })
  }
  // setUserPicture(url:string){
  //   const imagePath='{"id":'+'"'+url+'"'+'}';
  //   this.userPicture=new BehaviorSubject<any>(JSON.parse(imagePath));
  //   this.picture = this.userPicture.asObservable();
  //   console.log("imagePath :",this.userPicture);
  // }
  // public get getUserPicture(){
  //   return this.userPicture?.value.id;
  // }
  public get userValue(){
    return this.userSubject?.value;
}
setImageUrl(url :any){
  this.urlImage=url;
}
getImageUrl(){
  return this.urlImage;
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
