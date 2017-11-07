import { Component, OnInit } from '@angular/core';
import { CartService } from '../shared/cart.service';
import { WishListService } from '../shared/wishlist.service';
import { Demand } from '../shared/demand';

@Component({
    selector: 'list-wish',
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
                <tr *ngFor="let car of wishList; let i = index">
                    <td>{{i+1}}</td>
                    <td><img src = "{{car.Picture}}" width="100" height="80"></td>
                    <td>{{car.Name}}</td>
                    <td>{{car.VehiclePower}} PS</td>
                    <td>{{car.MaximumSpeed}} km/h</td>
                    <td>{{car.Price}} $</td>
                    <td><a (click)="addToCart(car.Id)" class="btn btn-success" role="button">Add to cart</a>
                        <a (click)="remove(car.Id)" class="btn btn-info" role="button">Remove</a></td>
                </tr>
            </tbody>
        </table>
    </div>`,
    providers: [CartService, WishListService]
})
export class WishListComponent implements OnInit {

    wishList: Demand[] = [];

    constructor(private wishListService: WishListService, private cartService: CartService) { }
    ngOnInit() {
        this.wishListService.getWishList().subscribe(res => {
            this.wishList = res;
        });
    }

    remove(carId: number) {
        const wishListComponent = this;
        this.wishListService.deleteFromWishList(carId).subscribe(function () {
            let index = wishListComponent.wishList.findIndex(car => car.Id === carId);
            wishListComponent.wishList.splice(index, 1);
        });
    }

    addToCart(idCar: number) {
        this.cartService.addToCart(idCar);
    }

}