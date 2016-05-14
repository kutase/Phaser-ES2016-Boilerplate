import { Component }         from '@angular/core';
import { HTTP_PROVIDERS }    from '@angular/http';

import { NgForm } from '@angular/common';

import { LoginService } from './../services/login.service';
import { LoginForm } from './../models/login.form';

@Component({
  selector: 'login-form',
  templateUrl: 'app/components/login-form.component.html',
  directives: [],
  providers:  [
    HTTP_PROVIDERS,
    LoginService,
    LoginForm
  ]
})
export class LoginFormComponent {

  constructor(
    private loginService: LoginService,
    private model: LoginForm
  ) { }

  onSubmit() { 
    console.log("Login@model:", this.model);
    this.loginService.login(this.model).subscribe(data => console.log(data));
  }

  // TODO: Remove this when we're done
  get diagnostic() { 
    return JSON.stringify(this.model); 
  }
}

