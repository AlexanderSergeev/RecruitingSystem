import { Component } from '@angular/core';
import { LoginService } from '../shared/login.service';
import { Router } from "@angular/router";

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
                    <button [disabled]="myForm.invalid" (click)="login(Login, Password)" class="btn btn-primary">Войти</button>
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
    userRole: string;

    constructor(private router: Router, private loginService: LoginService) { }

    login(login: string, password: string) {
        this.loginService.login(login, password).subscribe(
            result => {
            },
            error => {
                alert("Ошибка авторизации");
            },
            () => {
            this.loginService.getCurrentUserRole().subscribe(res => {
                    this.userRole = res;
                },
                error => {
                    alert(error.statusText);
                },
                () => {
                    switch (this.userRole) {
                        case "HR":
                        case "Technical":
                            this.router.navigate(['candidates']);
                            break;
                        case "ProjectManager":
                            this.router.navigate(['demands']);
                            break;
                        default:
                            this.router.navigate(['vacancies']);
                            break;
                    }
                });
            }
        );
    }

}