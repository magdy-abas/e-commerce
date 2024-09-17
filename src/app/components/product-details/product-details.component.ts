import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { IProduct } from '../../core/interfaces/product';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../core/services/wishlist.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent implements OnInit {
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _ProductsService: ProductsService,
    private _CartService: CartService,
    private _ToastrService: ToastrService,
    private _WishlistService: WishlistService
  ) {}

  product: IProduct = {} as IProduct;

  addToCart = (productId: string) => {
    this._CartService.addProductToCart(productId).subscribe({
      next: (res) => {
        this._CartService.cartCounter.next(res.numOfCartItems);
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

  addToWishList = (productId: string) => {
    this._WishlistService.addProductToWishlist(productId).subscribe({
      next: (res) => {
        console.log(res);
        this._WishlistService.wishCounter.next(res.data.length);
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

  ngOnInit(): void {
    let id: string | null = '';
    this._ActivatedRoute.paramMap.subscribe({
      next: (pram) => {
        id = pram.get('id');
      },
    });

    this._ProductsService.getProduct(id).subscribe({
      next: (res) => {
        console.log(res);
        this.product = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
