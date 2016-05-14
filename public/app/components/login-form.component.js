"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var login_service_1 = require('./../services/login.service');
var login_form_1 = require('./../models/login.form');
var LoginFormComponent = (function () {
    function LoginFormComponent(loginService, model) {
        this.loginService = loginService;
        this.model = model;
    }
    LoginFormComponent.prototype.onSubmit = function () {
        console.log("Login@model:", this.model);
        this.loginService.login(this.model).subscribe(function (data) { return console.log(data); });
    };
    Object.defineProperty(LoginFormComponent.prototype, "diagnostic", {
        // TODO: Remove this when we're done
        get: function () {
            return JSON.stringify(this.model);
        },
        enumerable: true,
        configurable: true
    });
    LoginFormComponent = __decorate([
        core_1.Component({
            selector: 'login-form',
            templateUrl: 'app/components/login-form.component.html',
            directives: [],
            providers: [
                http_1.HTTP_PROVIDERS,
                login_service_1.LoginService,
                login_form_1.LoginForm
            ]
        }), 
        __metadata('design:paramtypes', [login_service_1.LoginService, login_form_1.LoginForm])
    ], LoginFormComponent);
    return LoginFormComponent;
}());
exports.LoginFormComponent = LoginFormComponent;
