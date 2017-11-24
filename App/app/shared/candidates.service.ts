import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Candidate } from '../shared/candidate';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class CandidatesService {

    constructor(private http: Http) { }

    getCandidates() {
        return this.http
            .get('/api/candidates')
            .map(res => res.json());
    }

    getCandidate(id: string) {
        return this.http
            .get('/api/candidates/' + id)
            .map(res => {
                return res.json();
            });
    }

    addCandidate(name: string, surname: string, patronym: string) {
        var json = JSON.stringify({
            Name: name,
            Surname: surname,
            Patronym: patronym
        });

        let headers = new Headers({ 'Content-Type': 'application/json;charset=utf-8' });

        return this.http.post('/api/candidates', json, { headers: headers })
            .map((resp: Response) => resp.json())
            .catch((error: any) => { return Observable.throw(error); });
    }

    editCandidate(id: number, name: string, surname: string, patronym: string) {
        var json = JSON.stringify({
            Id: id,
            Name: name,
            Surname: surname,
            Patronym: patronym
        });

        let headers = new Headers({ 'Content-Type': 'application/json;charset=utf-8' });

        return this.http.put('/api/candidates/', json, { headers: headers })
            .map((resp: Response) => resp.json())
            .catch((error: any) => { return Observable.throw(error); });
    }

    remove(id: number) {
        return this.http.delete('/api/candidates/' + id)
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