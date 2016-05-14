import { Component } from '@angular/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';

import { LoginFormComponent } from './login-form.component';

import { HighlightDirective } from './../directives/highlight.directive';

@Component({
  selector: 'owengine',
  templateUrl: 'app/components/app.component.html',
  styleUrls: [],
  directives: [
    ROUTER_DIRECTIVES,
    HighlightDirective
  ],
  providers: [
    ROUTER_PROVIDERS
  ]
})
@RouteConfig([
  {
    path: '/login',
    name: 'Login',
    component: LoginFormComponent,
    useAsDefault: true
  }
])
export class AppComponent {
  user;
}
