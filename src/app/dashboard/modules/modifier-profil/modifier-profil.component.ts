import { HttpClient, HttpErrorResponse, HttpEventType, HttpResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AnyForUntypedForms, Form, FormBuilder, FormControl, FormGroup, NgForm } from '@angular/forms';
import { CompteInfo } from 'src/app/_interfaces/CompteInfo.model';
import { User } from 'src/app/_interfaces/User.model';
import { Validators } from '@angular/forms';
import { BehaviorSubject, first } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardService } from 'src/app/shared/services/dashboard.service';


@Component({
  selector: 'app-modifier-profil',
  templateUrl: './modifier-profil.component.html',
  styleUrls: ['./modifier-profil.component.scss']
})

export class ModifierProfilComponent implements OnInit {
  userForm = new FormControl({
    
    firstname:  new FormControl(''),
    lastname:new FormControl(''),
    Email:new FormControl(''),
    jobtitle:new FormControl(''),
    telephone1:new FormControl(''),
    mobilephone: new FormControl(''),
    fax:new FormControl(''),
    preferredcontactmethodcode:new FormControl(''),
    address1_line1:new FormControl(''),
    address1_line2:new FormControl(''),
    address1_postalcode:new FormControl(''),
    gendercode:new FormControl(''),
    birthdate:new FormControl(''),
    address1_country:new FormControl(''),
  });

//public isCreate:boolean;
public User:CompteInfo;
public Users:User[]=[];
public nom:string;
public prenom:string;
public telephone:string;
public email:string;
private route: ActivatedRoute;
private router: Router;
private userService: DashboardService;


loading = false;
submitted = false;
  progress: number;
  message: string;

  @Output() public onUploadFinished = new EventEmitter();

  UrlImage:string="./assets/images/pexels.jpg";
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading: boolean;
  Email:string;
  UserName:string;



  constructor(private http: HttpClient,private cdr: ChangeDetectorRef) {
   
   }

  ngOnInit(): void {
 
   this.UserName=sessionStorage.getItem("UserName");
    this.Email=sessionStorage.getItem("Email");
    
  }
  onFormSubmit(userForm: NgForm){
    console.log(userForm)
  }
resetform(userForm: NgForm){
  userForm.resetForm();
}
  
/*private updateUser() {
  this.userService.ProfileUser(this.userForm.value)
      .pipe(first())
      .subscribe({
          next: () => {
              this.alertService.success('User updated', { keepAfterRouteChange: true });
              this.router.navigate(['../../'], { relativeTo: this.route });
          },
      
      });
}*/
saveSettings() {
  this.isLoading$.next(true);
  setTimeout(() => {
    this.isLoading$.next(false);
    this.cdr.detectChanges();
  }, 1500);
}
}
