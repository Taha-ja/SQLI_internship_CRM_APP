import {Adresses} from'./Adresses.model';
export interface profile{
 
    firstname?: string;
    lastname?:string;
    emailaddress1?:string;
    jobtitle?:string;
    telephone1?:string;
    mobilephone?: string;
    fax?:string;
    preferredcontactmethodcode?:string;
    address1_line1?:Adresses;
    address1_line2?:Adresses;
    address1_postalcode?:string;
    gendercode?:any;
    birthdate?:string;
    address1_country?:string;
    address1_composite?:string;
    familystatuscode?:any;
}