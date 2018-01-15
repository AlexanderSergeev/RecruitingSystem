import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { DemandsComponent } from './demands/demands.component';
import { CandidatesComponent } from './candidates/candidates.component';
import { StaffComponent } from './staff/staff.component';
import { VacanciesComponent } from './vacancies/vacancies.component';
import { VacancyComponent } from './vacancies/vacancy.component';
import { DemandComponent } from './demands/demand.component';
import { appRouterModule } from "./app.routes";
import { VacanciesService } from "./shared/vacancies.service";
import { DemandsService } from "./shared/demands.service";
import { CandidatesService } from "./shared/candidates.service";
import { StaffService } from "./shared/staff.service";
import { AppComponent } from './app.component';
import { DemandFormComponent } from './demands/demandForm.component';
import { CandidateFormComponent } from './candidates/candidateForm.component';
import { StaffFormComponent } from './staff/staffForm.component';
import { VacancyFormComponent } from './vacancies/vacancyForm.component';
import { VacancyCandidateFormComponent } from './vacancies/vacancyCandidateForm.component';
import { DemandStaffFormComponent } from './demands/demandStaffForm.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [BrowserModule, HttpModule, appRouterModule, FormsModule],
    declarations: [DemandsComponent, StaffComponent, CandidatesComponent, CandidateFormComponent, StaffFormComponent, VacanciesComponent, VacancyComponent, DemandComponent, AppComponent, DemandFormComponent, VacancyFormComponent, VacancyCandidateFormComponent, DemandStaffFormComponent],
    bootstrap: [AppComponent],
    providers: [DemandsService, VacanciesService, CandidatesService, StaffService]
})
export class AppModule { }
