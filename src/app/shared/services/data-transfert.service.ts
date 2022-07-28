import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataTransfertService {
  private email:string;
  private firstname:string;
  private lastname:string;
  constructor() {
  
  }

  setEmail(email :string){
    this.email=email;
  }
  getEmail(){
    console.log('from get email '+this.email)
    return this.email;
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
