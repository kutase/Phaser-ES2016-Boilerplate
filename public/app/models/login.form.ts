import { Injectable }     from '@angular/core';

@Injectable()
export class LoginForm {
  public email: string;
  public password: string;
  public rememberMe: boolean;
  public isValid: boolean;
}