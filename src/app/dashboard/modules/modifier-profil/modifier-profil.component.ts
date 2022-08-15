import { HttpClient, HttpErrorResponse, HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CompteInfo } from 'src/app/_interfaces/CompteInfo.model';
import { User } from 'src/app/_interfaces/User.model';



@Component({
  selector: 'app-modifier-profil',
  templateUrl: './modifier-profil.component.html',
  styleUrls: ['./modifier-profil.component.scss']
})

export class ModifierProfilComponent implements OnInit {
public isCreate:boolean;
public User:CompteInfo;
public Users:User[]=[];
public nom:string;
public prenom:string;
public telephone:string;
public email:string;

  progress: number;
  message: string;

  @Output() public onUploadFinished = new EventEmitter();

  UrlImage:string="./assets/images/149071.png";
  Nom:string;
  Prenom:string;
  Email:string;
  Firstname:string;
  PhoneNumber:string;
  response: {dbPath: ''};

  file: FileList;
  fileToUpload:File=null;
  percentDone: number;
  uploadSuccess: boolean;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
 
   this.Firstname=sessionStorage.getItem("Firstname");
    this.Email=sessionStorage.getItem("Email");
    
  }
  handleFileInput(file: FileList){
     this.fileToUpload=file.item(0);
     var reader=new FileReader();
     reader.onload=(event:any)=>{
      this.UrlImage=event.target.result;
     }
     reader.readAsDataURL(this.fileToUpload);
  }

uploadFile = (files) => {
 
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    
    this.http.post('https://localhost:7290/api/Image/UploadImage', formData, {reportProgress: true, observe: 'events'})
      .subscribe({
        next: (event) => {
          
        if (event.type === HttpEventType.UploadProgress){
          this.progress = Math.round(100 * event.loaded / event.total);
          this.User={
            Nom:this.nom,
            Prenom:this.prenom,
            tele:this.telephone,
            Imagee:this.response.dbPath,
            }}

        else if (event.type === HttpEventType.Response) {
          console.log ('hello');
          this.message = 'Upload success.';
          this.onUploadFinished.emit(event.body);
          // var reader=new FileReader();
          // reader.onload=(event:any)=>{
          //   this.UrlImage=event.target.result;
          //  }

       
        }
        else  this.message = 'Erreur';
      },
      error: (err: HttpErrorResponse) => console.log(err)
    });
  }
  public onCreate=()=>{
    this.User={
    Nom:this.nom,
    Prenom:this.prenom,
    tele:this.telephone,
    Imagee:this.response.dbPath,
    }
    this.UrlImage=this.response.dbPath;
    console.log("AAA :"+this.UrlImage)
  
  }
  public returnToCreate=()=>{
      this.isCreate=true;
      this.nom='';
      this.prenom='';
      this.telephone='';
      
  }
  public createImgPath = (serverPath: string) => { 
    return `https://localhost:7290/api/Image/api/UploadImage`; 
  }
  
}
