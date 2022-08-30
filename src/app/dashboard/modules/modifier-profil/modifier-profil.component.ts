import { HttpClient, HttpErrorResponse, HttpEventType, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import * as _ from 'lodash';

import { DashboardService } from 'src/app/shared/services/dashboard.service';

import { EmailCheck } from 'src/app/_interfaces/email.model';
import { HotToastService } from '@ngneat/hot-toast';
import { profile } from 'src/app/_interfaces/profile.model';
import { Adresses } from 'src/app/_interfaces/Adresses.model';
import { Router } from '@angular/router';
import { DataTransfertService } from 'src/app/shared/services/data-transfert.service';


@Component({
  selector: 'app-modifier-profil',
  templateUrl: './modifier-profil.component.html',
  styleUrls: ['./modifier-profil.component.scss']
})


export class ModifierProfilComponent implements OnInit {

  apiAddress: string = 'api/Crm/profileUpdate';

  Form: FormGroup;
  Data!: any;
  emailCheck: EmailCheck = { email: '' };
  showSpinner: boolean = true;
  section: any;
  notFound: boolean = false;
  isErrorHappend: boolean = false;
  Datafamilystatuscode: any = [{ id: 1, name: 'Single' }, { id: 2, name: 'Married' }, { id: 3, name: 'Divorced' }, { id: 4, name: 'Widowed' }];

  me: any;
  userDetails: any;

  UrlImage: any;
  ProfileDetails: profile;
  isProfileLoaded: boolean = false;
  BillingAddress: Adresses;
  ShippingAddress: Adresses;

  /* Properties for the profile form */



  updateProfileForm = new FormGroup({
    entityimage: new FormControl(),
    firstname: new FormControl(),
    emailaddress1: new FormControl(),
    lastname: new FormControl(),
    jobtitle: new FormControl(),
    telephone1: new FormControl(),
    mobilephone: new FormControl(),
    fax: new FormControl(),
    preferredcontactmethodcode: new FormControl(),
    address1_line1: new FormControl(),
    address1_line2: new FormControl(),
    address1_postalcode: new FormControl(),
    gendercode: new FormControl(),
    birthdate: new FormControl(),
    address1_country: new FormControl(),
    address1_composite: new FormControl(),
    familystatuscode: new FormControl(),
  });



  modalMessage: string;
  modalTitle: string;
  errorList: string[] = [];



  constructor(private http: HttpClient, private dashService: DashboardService, private toastr: HotToastService, private router: Router
    , private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private dataTransfert: DataTransfertService
  ) {

  }

  ngOnInit(): void {

    this.initDataTable();
    this.initForm();
  }
  getBase64(event: any) {
    let file = event.target.files[0];
    var fileExtension = file.split('.').pop();
    let reader = new FileReader();
    let types = ['jpg', 'jpeg', 'gif', 'tif', 'tiff', 'bmp', 'png']
    // if(fileExtension in types){
    reader.readAsDataURL(file);
    // }
    reader.onload = () => {
      this.me = reader.result;
      console.log(reader.result);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }
  initForm() {
    this.updateProfileForm = this.fb.group({
      entityimage: [
        '',
        Validators.compose([]),
      ],
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
      address1_composite: [
        '',
        Validators.compose([]),
      ]
    });
  }

  onselectFile(e) {
    const file = e.target.files[0];
    const fileExtension = file.type;
    let reader = new FileReader();
    let types = ['image/jpg', 'image/jpeg', 'image/tif', 'image/tiff', 'image/bmp', 'image/png']
    console.log(e.target.files[0].type);
    if (_.includes(types, e.target.files[0].type)) {

      reader.readAsDataURL(file);

    }
    else {
      this.showError("Please choose a valid extension 'jpg', 'jpeg', 'gif', 'tif', 'tiff', 'bmp','png' ");
    }
    reader.onload = () => {
      this.UrlImage = reader.result;
      console.log(reader.result);

    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
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
      const userImage = this.UrlImage.replace(/^data:(.*,)?/, '');
      data['entityimage'] = userImage;
      console.log(data);
      this.dashService.updateProfile(this.apiAddress, data).subscribe({
        next: (responce) => {
          if (responce.message == "successfully") {
            this.showSuccess();
            this.dataTransfert.profileImageUpdate$.next(this.UrlImage);
            this.dataTransfert.fullNameUpdate$.next(data['firstname']+" "+data['lastname']);

            this.router.navigate(['/dashboard/comptes']);
          }
          else {
            this.showError('Something went wrong!!');
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
      error => (this.showError('Something went wrong!!'))
    }

  }

  initDataTable() {
    const apiAddress: string = 'api/Crm/profileDetails';
    this.dashService.opportunities(apiAddress).subscribe({
      next: (responce) => {
        this.Data = responce.value[0];
        this.updateProfileForm.patchValue(responce.value[0])
        this.cdr.markForCheck();
        if (this.Data.entityimage != null) {
          this.UrlImage = "data:image/png;base64," + this.Data.entityimage;

        }
        else {
          this.UrlImage = "../../../../../assets/images/unkown.jfif"
          console.log("image", responce.entityimage)
        }

        console.log(this.Data);
        this.notFound = true;
      },
      error: () => {
        setTimeout(() => {
          this.isErrorHappend = true;
        }, 5000)
      }
    })
  }

  showSuccess() {
    this.toastr.success('account Updated!');
  }
  showError(message: string) {
    this.toastr.error(message);
  }


}



