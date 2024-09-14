import { IProduct } from './../../core/interfaces/product';
import { ProductsService } from '../../core/services/products.service';
import { Component, input, OnInit, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { CurrencyPipe, NgClass } from '@angular/common';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { WishlistService } from '../../core/services/wishlist.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RouterLink, CurrencyPipe, SearchPipe, NgClass],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent implements OnInit {
  constructor(
    private _ProductsService: ProductsService,
    private _CartService: CartService,
    private _ToastrService: ToastrService,
    private _WishlistService: WishlistService
  ) {}

  wishlistProductIds: Set<string> = new Set();
  allProducts: IProduct[] = [];

  @Input() term: string = '';
  getProducts = () => {
    this._ProductsService.getProducts().subscribe({
      next: (res) => {
        this.allProducts = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  };

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

  getWishList = () => {
    this._WishlistService.getLoggedUserWishlist().subscribe({
      next: (res) => {
        console.log(res);
        this.wishlistProductIds = new Set(
          res.data.map((product: IProduct) => product._id)
        );
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
  };

  toggleWishlist(productId: string) {
    if (this.wishlistProductIds.has(productId)) {
      this.removeFromWishList(productId);
    } else {
      this.addToWishList(productId);
    }
  }

  addToWishList = (productId: string) => {
    this._WishlistService.addProductToWishlist(productId).subscribe({
      next: (res) => {
        console.log(res);
        this._WishlistService.wishCounter.next(res.data.length);
        this.wishlistProductIds.add(productId);
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

  removeFromWishList = (productId: string) => {
    this._WishlistService.removeProductFromWishlist(productId).subscribe({
      next: (res) => {
        console.log(res);
        this.wishlistProductIds.delete(productId);
        this._WishlistService.wishCounter.next(res.data.length);
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

  isInWishlist(productId: string): boolean {
    return this.wishlistProductIds.has(productId);
  }
  ngOnInit(): void {
    this.getProducts();
    this.getWishList();
  }

  preventNavigation(event: Event) {
    event.stopPropagation();
  }
}
