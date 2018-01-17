import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class VacanciesService {

    constructor(private http: Http) { }

    getVacancies() {
        return this.http
            .get('/api/vacancies')
            .map(res => res.json());
    }

    getVacancy(id: string) {
        return this.http
            .get('/api/vacancies/' + id)
            .map(res => {
                return res.json();
            });
    }

    getVacancyCandidates(id: string) {
        return this.http
            .get('/api/vacancies/candidates/' + id)
            .map(res => {
                return res.json();
            });
    }

    getOtherVacancyCandidates(id: string) {
        return this.http
            .get('/api/vacancies/otherCandidates/' + id)
            .map(res => {
                return res.json();
            });
    }

    addVacancy(name: string, vacancyStatus: number, vacancyLocation: string) {
        var json = JSON.stringify({
            Name: name,
            VacancyStatus: vacancyStatus,
            VacancyLocation: vacancyLocation
        });

        let headers = new Headers({ 'Content-Type': 'application/json;charset=utf-8' });

        return this.http.post('/api/vacancies', json, { headers: headers })
            .map((resp: Response) => resp.json())
            .catch((error: any) => { return Observable.throw(error); });
    }

    addVacancyCandidate(idCandidate: number, idVacancy: string) {
        var json = JSON.stringify({
            IdCandidate: idCandidate,
            IdVacancy: idVacancy
        });

        let headers = new Headers({ 'Content-Type': 'application/json;charset=utf-8' });

        return this.http.post('/api/vacancies/candidates', json, { headers: headers })
            .map(this.extractData)
            .catch(this.handleErrorObservable);
    }

    checkCandidate(idCandidate: number, idVacancy: string, status: boolean) {
        var json = JSON.stringify({
            IdCandidate: idCandidate,
            IdVacancy: idVacancy
        });

        let headers = new Headers({ 'Content-Type': 'application/json;charset=utf-8' });

        return this.http.put('/api/vacancies/candidates/' + status, json, { headers: headers })
            .map(this.extractData)
            .catch(this.handleErrorObservable);
    }

    checkCandidateInterview(idCandidate: number, idVacancy: string, status: boolean) {
        var json = JSON.stringify({
            IdCandidate: idCandidate,
            IdVacancy: idVacancy
        });

        let headers = new Headers({ 'Content-Type': 'application/json;charset=utf-8' });

        return this.http.put('/api/vacancies/candidates/interview/' + status, json, { headers: headers })
            .map(this.extractData)
            .catch(this.handleErrorObservable);
    }

    editVacancy(id: number, name: string, vacancyStatus: number, vacancyLocation: string) {
        var json = JSON.stringify({
            Id: id,
            Name: name,
            VacancyStatus: vacancyStatus,
            VacancyLocation: vacancyLocation
        });

        let headers = new Headers({ 'Content-Type': 'application/json;charset=utf-8' });

        return this.http.put('/api/vacancies/', json, { headers: headers })
            .map((resp: Response) => resp.json())
            .catch((error: any) => { return Observable.throw(error); });
    }

    remove(id: number) {
        return this.http.delete('/api/vacancies/' + id)
            .map(this.extractData)
            .catch(this.handleErrorObservable);
    }

    removeCandidateFromVacancy(idCandidate: number, idVacancy: string) {
        return this.http.delete('/api/vacancies/' + idCandidate + '/' + idVacancy)
            .map(this.extractData)
            .catch(this.handleErrorObservable);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }
    private handleErrorObservable(error: Response | any) {
        console.error(error.message || error);
        return Observable.throw(error.message || error);
    }
}