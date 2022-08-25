import { HttpClient, HttpErrorResponse, HttpEventType, HttpHeaders, HttpResponse } from '@angular/common/http';
import {ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import Swal from 'sweetalert2';


import { DashboardService } from 'src/app/shared/services/dashboard.service';

import { EmailCheck } from 'src/app/_interfaces/email.model';
import { HotToastService } from '@ngneat/hot-toast';
import { profile } from 'src/app/_interfaces/profile.model';
import { Adresses } from 'src/app/_interfaces/Adresses.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-modifier-profil',
  templateUrl: './modifier-profil.component.html',
  styleUrls: ['./modifier-profil.component.scss']
})


export class ModifierProfilComponent implements OnInit {
  
  apiAddress: string = 'api/Crm/profileUpdate';
  
  Form:FormGroup;
  Data!: any;
  emailCheck:EmailCheck={email:''};
  showSpinner:boolean=true;
  section:any;

  Datafamilystatuscode: any = [{id:1,name:'Single'}, {id: 2,name:'Married'}, {id: 3,name:'Divorced'}, {id: 4,name:'Widowed'}];


  userDetails: any;

  UrlImage:string="./assets/images/pexels.jpg";
  ProfileDetails: profile;
    isProfileLoaded: boolean = false;
    BillingAddress: Adresses;
    ShippingAddress: Adresses;

    /* Properties for the profile form */
  


    updateProfileForm = new FormGroup({
      firstname: new FormControl(),
      emailaddress1:new FormControl(),
      lastname: new FormControl(),
      jobtitle: new FormControl(),
      telephone1: new FormControl(),
      mobilephone: new FormControl(),
      fax: new FormControl(),
      preferredcontactmethodcode:new FormControl(),
      address1_line1:new FormControl(),
      address1_line2: new FormControl(),
      address1_postalcode: new FormControl(),
      gendercode: new FormControl(),
      birthdate: new FormControl(),
      address1_country:new FormControl(),
      address1_composite: new FormControl(),
      familystatuscode: new FormControl(),
  });



modalMessage:string;
modalTitle:string;
errorList:string[]=[];



  constructor(private http: HttpClient,private dashService:DashboardService, private toastr: HotToastService,private router:Router
  ,private fb: FormBuilder,
  private cdr: ChangeDetectorRef,
  ) {
   
   }

  ngOnInit(): void {
 
    this.initDataTable();
    this.section = document.getElementById("section");
    this.section.style.opacity ="0";
    this.loadUserProfile();
    this.initForm();
  }
  
  initForm() {
    this.updateProfileForm = this.fb.group({
      firstname: [
        '',
        Validators.compose([]),
      ],
      lastname: [
        '',
        Validators.compose([]),
      ],
      emailaddress1: [
        '',
        Validators.compose([]),
      ],
      jobtitle: [
        '',
        Validators.compose([]),
      ],
      telephone1: [
        '',
        Validators.compose([]),
      ],

      mobilephone: [
        '',
        Validators.compose([]),
      ],

      fax: [
        '',
        Validators.compose([]),
      ],
      familystatuscode: [
        '',
        Validators.compose([]),
      ],
      preferredcontactmethodcode: [
        '',
        Validators.compose([]),
      ],
      address1_line1: [
        '',
        Validators.compose([]),
      ],
      address1_line2: [
        '',
        Validators.compose([]),
      ],
      address1_postalcode: [
        '',
        Validators.compose([]),
      ],
      gendercode: [
        '',
        Validators.compose([]),
      ],
      birthdate: [
        '',
        Validators.compose([]),
      ],
      address1_country: [
        '',
        Validators.compose([]),
      ],
      address1_composite:[
        '',
        Validators.compose([]),
      ]
    });
  }

  onselectFile(e){
if(e.target.files){
    var reader=new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload=(event:any)=>{
      this.UrlImage=event.target.result;
      
    }
  }
  }
  loadUserProfile() {
    this.dashService.getProfileByUser("/ModifierProfile",this.emailCheck).subscribe((result) => {
        result.useAddress.forEach((obj, index) => {
            if (obj.type == 'Billing') {
                this.BillingAddress = obj;
                for (let billingAddressObj in this.BillingAddress) {
                    if (this.BillingAddress.hasOwnProperty(billingAddressObj)) {
                        if (this.BillingAddress[billingAddressObj] == 'null') {
                            this.BillingAddress[billingAddressObj] = '';
                        }
                    }
                }
            }
          
        });




        this.isProfileLoaded = true;

        // console.log(this.ProfileDetails);
    });
}
get f() {
  return this.updateProfileForm.controls;
}

updateProfile() {
    if (true) {
      console.log(this.f);
      
      const data: {
        [key: string]: string;
      } = {};
      Object.keys(this.f).forEach((key) => {
          data[key] = this.f[key].value;
      });

      console.log(data);
      this.dashService.updateProfile(this.apiAddress, data).subscribe({
        next:(responce)=>{
          //var result = JSON.parse(JSON.stringify(responce));
          if(responce.message=="successfully"){
          this.showSuccess();
          this.router.navigate(['/dashboard/comptes']);
          //window.location.reload();
          }
          else{
            this.showError();
            this.router.navigate(['/dashboard/ModifierProfile']);
          }
        }   
      });
      this.isProfileLoaded = false;
    } 
    else {
        this.errorList = [];
        const controls = this.updateProfileForm.controls;

     
        console.log(this.errorList);
        error => ( this.showError() )
    }
    
}

initDataTable() {
  const apiAddress: string = 'api/Crm/profileDetails';
  this.dashService.opportunities(apiAddress).subscribe({
    next:(responce)=>{
      this.Data=responce.value[0];
      this.updateProfileForm.patchValue(responce.value[0])
      this.cdr.markForCheck();
      console.log(this.Data);
      if(this.Data!=null){
        this.showSpinner=false;
        this.section.style.opacity ="1";
      }
    }   
  })
}

showSuccess() {
  this.toastr.success('Compte Updated!');
}
showError() {
  this.toastr.error('Something went wrong!!');
}


}



