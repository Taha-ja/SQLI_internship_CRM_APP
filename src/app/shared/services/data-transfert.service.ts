import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataTransfertService {
  private email:string;
  private firstname:string;
  private lastname:string;
  private teamProfile:string;
  constructor() {
  
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
