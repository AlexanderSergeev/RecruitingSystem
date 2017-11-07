import { Component, OnInit } from '@angular/core';
import { CartService } from '../shared/cart.service';
import { Demand } from '../shared/demand';

@Component({
    selector: 'list-cart',
    template: `
    <div class="panel">
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>№</th> 
                    <th>Picture</th> 
                    <th>Name</th> 
                    <th>VehiclePower</th>
                    <th>MaximumSpeed</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                <tr *ngFor="let car of cart; let i = index">
                    <td>{{i+1}}</td>
                    <td><img src = "{{car.Picture}}" width="100" height="80"></td>
                    <td>{{car.Name}}</td>
                    <td>{{car.VehiclePower}} PS</td>
                    <td>{{car.MaximumSpeed}} km/h</td>
                    <td>{{car.Price}} $</td>
                    <td><a (click)="remove(car.Id)" class="btn btn-info" role="button">Remove</a></td>
                </tr>
            <tr>
                <td>Total:</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>{{getSum()}} $</td>
                <td><a *ngIf="getSum()!==0" [routerLink]="['/purchase'] " class="btn btn-primary" role="button">Buy All</a></td>
            </tr>
            </tbody>
        </table>
    </div>`,
    providers: [CartService]
})
export class CartComponent implements OnInit {

    cart: Array<Demand> = [];

    constructor(private cartService: CartService) { }
    ngOnInit() {
        this.cartService.getCart().subscribe(res => {
            this.cart = res;
        });
    }

    remove(carId: number) {
        const cartComponent = this;
        cartComponent.cartService.deleteFromCart(carId, function () {
            let index = cartComponent.cart.findIndex(car => car.Id === carId);
            cartComponent.cart.splice(index, 1);
        });

    }
}