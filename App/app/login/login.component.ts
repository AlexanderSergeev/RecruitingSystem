import { Component } from '@angular/core';
import { LoginService } from '../shared/login.service';

@Component({
    selector: 'login',
    template: `
    <div class="navbar navbar-inverse navbar-fixed-top"></div>
    <form #myForm="ngForm" novalidate>
        <div class="row">
            <h4 style="margin-left:15px;">Авторизация</h4>
            <br>
            <div class="form-group">
                <label class="col-md-6 control-label">Логин: </label>
                <div class="col-md-10">
                    <input id="Login" class="form-control" type="text" name="Login" [(ngModel)]="Login" required/>
                </div>
            </div>
            <div class="form-group">
                <label class="col-md-6 control-label">Пароль: </label>
                <div class="col-md-10">
                    <input id="Password" class="form-control" type="password" name="Password" [(ngModel)]="Password" required/>
                </div>
            </div>
            <div class="form-group">
                <div class="col-md-10">
                    <br>
                    <button [routerLink]="['/demands']" [disabled]="myForm.invalid" (click)="login(Login, Password)" class="btn btn-primary">Войти</button>
                </div>
            </div>
        </div> 
    </form>`,
    providers: [LoginService]
})
export class LoginComponent {

    sub: any;
    Login: string;
    Password: string;

    constructor(private loginService: LoginService) { }

    login(login: string, password: string) {
        alert(login);
        alert(password);
    }

}