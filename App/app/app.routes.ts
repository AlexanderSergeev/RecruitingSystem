import { Routes, RouterModule } from '@angular/router';
import { DemandsComponent } from './demands/demands.component';
import { DemandFormComponent } from './demands/demandForm.component';
import { VacanciesComponent } from './vacancies/vacancies.component';
import { VacancyComponent } from './vacancies/vacancy.component';
import { VacancyFormComponent } from './vacancies/vacancyForm.component';
import { CandidatesComponent } from './candidates/candidates.component';
import { CandidateFormComponent } from './candidates/candidateForm.component';

const routes: Routes = [
    {
        path: '', redirectTo: 'demands', pathMatch: 'full'
    },
    {
        path: 'demands', component: DemandsComponent,
        children:
        [
            {
                path: 'form', component: DemandFormComponent,
            },
            {
                path: 'form/:id', component: DemandFormComponent,
            },
        ]
    },
    {
        path: 'candidates', component: CandidatesComponent,
        children:
        [
            {
                path: 'form', component: CandidateFormComponent,
            },
            {
                path: 'form/:id', component: CandidateFormComponent,
            },
        ]
    },
    {
        path: 'vacancies', component: VacanciesComponent,
        children:
        [
            {
                path: 'form', component: VacancyFormComponent,
            },
            {
                path: 'form/:id', component: VacancyFormComponent,
            },
        ]
    },
    {
        path: 'vacancies/:id', component: VacancyComponent,
    },
    {
        path: '**', redirectTo: 'demands', pathMatch: 'full'
    }
];

export const appRouterModule = RouterModule.forRoot(routes);