import { Component, OnInit, OnDestroy } from '@angular/core';
import { VacanciesService } from '../shared/vacancies.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    template: `
    <form #myForm="ngForm" novalidate>
        <div class="row">
            <h4 style="margin-left:15px;">Кандидаты</h4>

            <div class="form-group">
                <div class="col-md-10">
                    <br>
                    <button [routerLink]="['/vacancies', id]" (click)="popUpHide()" class="btn btn-primary">Отменить</button>
                </div>
            </div>
        </div>
    </form>`,
    providers: [VacanciesService]
})
export class VacancyCandidateFormComponent implements OnInit, OnDestroy {

    sub: any;
    id: string;

    constructor(private vacanciesService: VacanciesService, private route: ActivatedRoute, private router: Router) { }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.id = params['id'];

        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    popUpHide() {
        document.getElementById("popupСandidateForm").style.display = "none";
    }

}