import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
    providedIn: 'root'
})
export class LanguageService {
    // private keyLanguage:string="keyLanguage";
    // private _userLanguage:string;
    // private supportedLanguges=['en','fr'];
    
    constructor(
        // private translate:TranslateService
    ) {


        // translate.addLangs(['en', 'fr']);  
        // translate.setDefaultLang('en');
        // this.initLanguage();
        // this.translate.use(this._userLanguage);
        
    }
    Arinput(){
        let lang=localStorage.getItem("keyLanguage");
        let input=document.querySelectorAll('input');
        if(lang==="ar"){
        input.forEach(inp => {
            inp.style.textAlign="end";
        });
        }
        else{
            input.forEach(inp => {
                inp.style.textAlign="start";
            });
        }
        return lang;
    }
    // initLanguage(){
    //     const value = localStorage.getItem(this.keyLanguage);
    //     if(value != null){
    //         this._userLanguage=value;
    //     }else{
    //         const browserLanguage = navigator.language.split("-")[0];
    //         this._userLanguage="en";
    //         if(this.supportedLanguges.includes(browserLanguage)){
    //             this._userLanguage=browserLanguage;
    //         } 
    //         localStorage.setItem(this.keyLanguage,this._userLanguage); 
    //     }
    // }
    // setLanguage(language:string){
    //     this._userLanguage=language;
    //     localStorage.setItem(this.keyLanguage,this._userLanguage);
    //     this.translate.use(this._userLanguage);
    // }
    // getUserLanguage(){
    //     return this._userLanguage;
    // }
    // getAvailableLanguages(){
    //     return this.supportedLanguges;
    // }
}
