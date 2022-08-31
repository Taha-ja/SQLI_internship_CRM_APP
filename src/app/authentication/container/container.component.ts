import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DataTransfertService } from 'src/app/shared/services/data-transfert.service';
import { LanguageService } from 'src/app/shared/services/language.service';
@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {
  id:number;
  email:string;
  currentYear = new Date().getFullYear();

//##############################################
siteLanguage: string = 'English';
siteLocale: string;
languageList = [
{ code: 'en', label: 'English' },
{ code: 'fr', label: 'Français' },
{ code: 'ar', label:'العربية'},
];
browserLanguage:string;
lang:string;
//##############################################



  constructor(private activeRoute: ActivatedRoute,
    private dataTransfertService: DataTransfertService,
    private router: Router,
    public translate: TranslateService,
    private languageService :LanguageService 
    ) {
      // translate.addLangs(['English', 'French']);  
      //translate.addLangs(['en', 'fr']);  
  }
  switchLang(lang: any) {  
    this.translate.use(lang.code);
    this.lang=lang.code;  
    console.log(this.lang);
    this.siteLanguage=lang.label;
    localStorage.setItem("keyLanguage",lang.code);
    this.languageService.Arinput(); 
  }
  setLang(code:string){
    this.languageList.forEach(lan => {
      if(lan.code===code){
        this.siteLanguage=lan.label;
      }
    });
  }
  initLanguage(){
    const value = localStorage.getItem("keyLanguage");
    if(value != null){
      this.translate.use(value);
      this.setLang(value);
      this.lang=value;   
    }else{
      this.browserLanguage = navigator.language.split("-")[0];
      this.languageList.forEach(lan => {
        if(lan.code===this.browserLanguage){
          this.siteLanguage=lan.label;
          this.lang=lan.code;  
          this.translate.setDefaultLang(this.browserLanguage);
        }
      });
    }
}


  ngOnInit(){
    this.logOrReg();
    //################################################
    // this.siteLocale = window.location.pathname.split('/')[1];
    // this.siteLanguage = this.languageList.find(f => f.code === this.siteLocale).label;
    this.initLanguage();
    // this.lang=localStorage.getItem("keyLanguage");
    // let input=document.querySelectorAll('input');
    // if(this.lang==="ar"){

    //   input.forEach(inp => {
    //     inp.style.textAlign="end";
    //   });

    // }
    //################################################
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
