import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class StaffService {

    constructor(private http: Http) { }

    getStaff() {
        return this.http
            .get('/api/staff')
            .map(res => res.json());
    }

    getStaffMember(id: number) {
        return this.http
            .get('/api/staff/' + id)
            .map(res => {
                return res.json();
            });
    }

    addStaffMember(name: string, surname: string, patronym: string) {
        var json = JSON.stringify({
            Name: name,
            Surname: surname,
            Patronym: patronym
        });

        let headers = new Headers({ 'Content-Type': 'application/json;charset=utf-8' });

        return this.http.post('/api/staff', json, { headers: headers })
            .map((resp: Response) => resp.json())
            .catch((error: any) => { return Observable.throw(error); });
    }

    editStaffMember(id: number, name: string, surname: string, patronym: string) {
        var json = JSON.stringify({
            Id: id,
            Name: name,
            Surname: surname,
            Patronym: patronym
        });

        let headers = new Headers({ 'Content-Type': 'application/json;charset=utf-8' });

        return this.http.put('/api/staff/', json, { headers: headers })
            .map((resp: Response) => resp.json())
            .catch((error: any) => { return Observable.throw(error); });
    }

    uploadResume(id: number, data: any) {

        let headers = new Headers({ 'enctype': 'multipart/form-data' });

        return this.http.post('/api/staff/uploadResume/' + id, data, { headers: headers })
            .map((resp: Response) => resp.json())
            .catch((error: any) => { return Observable.throw(error); });
    }

    remove(id: number) {
        return this.http.delete('/api/staff/' + id)
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