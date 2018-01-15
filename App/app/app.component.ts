import { Component } from '@angular/core';

@Component({
    selector: 'app',
    template: `
    <div class="navbar navbar-inverse navbar-fixed-top">
        <div class="container">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a [routerLink]="['/demands']" class="navbar-brand">Запросы</a>
                <a [routerLink]="['/vacancies']" class="navbar-brand">Вакансии</a>
                <a [routerLink]="['/staff']" class="navbar-brand">Сотрудники</a>
                <a [routerLink]="['/candidates']" class="navbar-brand">Кандидаты</a>
            </div>
        </div>
    </div>
<router-outlet></router-outlet>`
})
export class AppComponent {
}