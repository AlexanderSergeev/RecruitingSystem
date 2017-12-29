import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { DemandsComponent } from './demands/demands.component';
import { CandidatesComponent } from './candidates/candidates.component';
import { VacanciesComponent } from './vacancies/vacancies.component';
import { VacancyComponent } from './vacancies/vacancy.component';
import { appRouterModule } from "./app.routes";
import { VacanciesService } from "./shared/vacancies.service";
import { DemandsService } from "./shared/demands.service";
import { CandidatesService } from "./shared/candidates.service";
import { AppComponent } from './app.component';
import { DemandFormComponent } from './demands/demandForm.component';
import { CandidateFormComponent } from './candidates/candidateForm.component';
import { VacancyFormComponent } from './vacancies/vacancyForm.component';
import { VacancyCandidateFormComponent } from './vacancies/vacancyCandidateForm.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [BrowserModule, HttpModule, appRouterModule, FormsModule],
    declarations: [DemandsComponent, CandidatesComponent, CandidateFormComponent, VacanciesComponent, VacancyComponent, AppComponent, DemandFormComponent, VacancyFormComponent, VacancyCandidateFormComponent],
    bootstrap: [AppComponent],
    providers: [DemandsService, VacanciesService, CandidatesService]
})
export class AppModule { }
