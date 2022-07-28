export interface ResetPasswordDto {
    newPassword: string;
    confirmNewPassword: string;
    token: string;
    userId:string;
    message:string;
    isSuccess:boolean;
}