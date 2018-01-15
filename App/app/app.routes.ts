import { Routes, RouterModule } from '@angular/router';
import { DemandsComponent } from './demands/demands.component';
import { DemandFormComponent } from './demands/demandForm.component';
import { VacanciesComponent } from './vacancies/vacancies.component';
import { VacancyComponent } from './vacancies/vacancy.component';
import { DemandComponent } from './demands/demand.component';
import { VacancyFormComponent } from './vacancies/vacancyForm.component';
import { VacancyCandidateFormComponent } from './vacancies/vacancyCandidateForm.component';
import { DemandStaffFormComponent } from './demands/demandStaffForm.component';
import { CandidatesComponent } from './candidates/candidates.component';
import { CandidateFormComponent } from './candidates/candidateForm.component';
import { StaffComponent } from './staff/staff.component';
import { StaffFormComponent } from './staff/staffForm.component';

const routes: Routes = [
    {
        path: '', redirectTo: 'demands', pathMatch: 'full'
    },
    {
        path: 'demands', component: DemandsComponent,
        children:
        [
            {
                path: 'form', component: DemandFormComponent
            },
            {
                path: 'form/:id', component: DemandFormComponent
            }
        ]
    },
    {
        path: 'demands/:id', component: DemandComponent,
        children:
        [
            {
                path: 'staffMemberForm', component: DemandStaffFormComponent
            }
        ]
    },
    {
        path: 'candidates', component: CandidatesComponent,
        children:
        [
            {
                path: 'form', component: CandidateFormComponent
            },
            {
                path: 'form/:id', component: CandidateFormComponent
            }
        ]
    },
    {
        path: 'staff', component: StaffComponent,
        children:
        [
            {
                path: 'form', component: StaffFormComponent
            },
            {
                path: 'form/:id', component: StaffFormComponent
            }
        ]
    },
    {
        path: 'vacancies', component: VacanciesComponent,
        children:
        [
            {
                path: 'form', component: VacancyFormComponent
            },
            {
                path: 'form/:id', component: VacancyFormComponent
            }
        ]
    },
    {
        path: 'vacancies/:id', component: VacancyComponent,
        children:
        [
            {
                path: 'candidateForm', component: VacancyCandidateFormComponent
            }
        ]
    },
    {
        path: '**', redirectTo: 'demands', pathMatch: 'full'
    }
];

export const appRouterModule = RouterModule.forRoot(routes);