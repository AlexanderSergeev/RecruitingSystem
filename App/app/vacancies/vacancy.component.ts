import { Component, OnInit, OnDestroy } from '@angular/core';
import { VacanciesService } from '../shared/vacancies.service';
import { Candidate } from '../shared/candidate';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'vacancy',
    template: `
    <div class="panel">
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>Имя</th>
                    <th>Фамилия</th> 
                    <th>Отчество</th>
                </tr>
            </thead>
            <tbody>
                <tr *ngFor="let candidate of candidates">
                    <td>{{candidate.Name}}</td>
                    <td>{{candidate.Surname}}</td>
                    <td>{{candidate.Patronym}}</td>
                </tr>
            </tbody>
        </table>
    </div>`,
    providers: [VacanciesService]
})
export class VacancyComponent implements OnInit, OnDestroy {

    candidates: Candidate[] = [];
    sub: any;

    constructor(private vacanciesService: VacanciesService, private route: ActivatedRoute, private router: Router) { }
    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            let id = params['id'];
            this.vacanciesService.getVacancyCandidates(id).subscribe(res => {
                this.candidates = res;
            });
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}