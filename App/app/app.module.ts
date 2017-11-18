import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { DemandsComponent } from './demands/demands.component';
import { VacanciesComponent } from './vacancies/vacancies.component';
import { VacancyComponent } from './vacancies/vacancy.component';
import { appRouterModule } from "./app.routes";
import { VacanciesService } from "./shared/vacancies.service";
import { DemandsService } from "./shared/demands.service";
import { AppComponent } from './app.component';
import { DemandFormComponent } from './demands/demandForm.component';
import { VacancyFormComponent } from './vacancies/vacancyForm.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [BrowserModule, HttpModule, appRouterModule, FormsModule],
    declarations: [DemandsComponent, VacanciesComponent, VacancyComponent, AppComponent, DemandFormComponent, VacancyFormComponent],
    bootstrap: [AppComponent],
    providers: [DemandsService, VacanciesService]
})
export class AppModule { }
