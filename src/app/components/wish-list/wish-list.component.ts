import { Component } from '@angular/core';
import { WishlistService } from '../../core/services/wishlist.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductComponent } from '../product/product.component';
import { IProduct } from '../../core/interfaces/product';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-wish-list',
  standalone: true,
  imports: [ProductComponent, CurrencyPipe, RouterLink],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.scss',
})
export class WishListComponent {
  constructor(
    private _WishlistService: WishlistService,
    private _CartService: CartService,
    private _ToastrService: ToastrService,
    private spinner: NgxSpinnerService
  ) {}
  wishproducts: IProduct[] = [];

  addToCart = (productId: string) => {
    this._CartService.addProductToCart(productId).subscribe({
      next: (res) => {
        console.log(res);
        this._ToastrService.success('Product added successfully', '', {
          progressBar: true,
          timeOut: 1500,
        });
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
  };

  getWishList = () => {
    this.spinner.show();
    this._WishlistService.getLoggedUserWishlist().subscribe({
      next: (res) => {
        console.log(res);

        this.wishproducts = res.data;
        this.spinner.hide();
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
  };

  removeFromWishList = (productId: string) => {
    this._WishlistService.removeProductFromWishlist(productId).subscribe({
      next: (res) => {
        this._WishlistService.wishCounter.next(res.data.length);
        this.wishproducts = this.wishproducts.filter(
          (product) => product._id !== productId
        );
        this._ToastrService.success('Product remove successfully', '', {
          progressBar: true,
          timeOut: 1500,
        });
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
  };

  ngOnInit(): void {
    this.getWishList();
  }

  preventNavigation(event: Event) {
    event.stopPropagation();
  }
}
