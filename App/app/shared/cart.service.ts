import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CartService {

    constructor(private http: Http) { }

    getCart() {
        return this.http
            .get('/api/cart')
            .map(res => res.json());
    }


    addToCart(idCar: number) {
        var xhr = new XMLHttpRequest();

        var json = JSON.stringify({
            CarId: idCar
        });
        xhr.open('POST', '/api/cart', true);
        xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        xhr.send(json);
        xhr.onreadystatechange = function () {
            if (xhr.readyState !== 4) return;
            if (xhr.status === 200 || xhr.status === 204) {
                alert("Adding successful");
            } else {
                alert(xhr.status + ': ' + xhr.statusText);
            }
        }
    }

    clearCart() {
        var xhr = new XMLHttpRequest();

        xhr.open('DELETE', '/api/cart/', true);
        xhr.send();
    }

    deleteFromCart(idCar: number, callback: Function) {
        var xhr = new XMLHttpRequest();

        xhr.open('DELETE', '/api/cart/' + idCar, true);
        xhr.send();
        xhr.onreadystatechange = function () {
            if (xhr.readyState !== 4) return;
            if (xhr.status === 200 || xhr.status === 204) {
                callback();
            } else {
                alert(xhr.status + ': ' + xhr.statusText);
            }
        }
    }

    addToPurchase(name: string, address: string, callback: Function) {
        var xhr = new XMLHttpRequest();

        var json = JSON.stringify({
            Name: name,
            OrderAddress: address
        });

        xhr.open('POST', '/api/cart/purchase', true);
        xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        xhr.send(json);
        xhr.onreadystatechange = function () {
            if (xhr.readyState !== 4) return;
            if (xhr.status === 200 || xhr.status === 204) {
                alert("Purchase successful");
                callback();
            } else {
                alert(xhr.status + ': ' + xhr.statusText);
            }
        }
    }
}