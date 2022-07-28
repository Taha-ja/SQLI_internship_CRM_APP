export interface RegistrationResponse {
    message:string;
    isExisted: boolean;
    email:string;
    firstname?:string;
    lastname?:string;
    //isSuccessfulRegistration: boolean;
    //errros?: string[];
    

}