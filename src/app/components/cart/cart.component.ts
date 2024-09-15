import { Component, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ICart } from '../../core/interfaces/cart';
import { CurrencyPipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  cart: ICart | null = null;

  constructor(
    private _CartService: CartService,
    private _ToastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getUserCart();
  }

  getUserCart(): void {
    this._CartService.getLoggedUserCart().subscribe({
      next: (res) => {
        this.cart = res;
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error fetching cart:', err);
        this._ToastrService.error('Failed to load cart', '', {
          progressBar: true,
          timeOut: 1500,
        });
      },
    });
  }

  deleteItem(id: string): void {
    this._CartService.removeItem(id).subscribe({
      next: (res) => {
        this._CartService.cartCounter.next(res.numOfCartItems);
        this.cart = res;
        this._ToastrService.success('Product Deleted Successfully', '', {
          progressBar: true,
          timeOut: 1500,
        });
      },
      error: (err) => {
        console.error('Error deleting item:', err);
        this._ToastrService.error('Failed to delete product', '', {
          progressBar: true,
          timeOut: 1500,
        });
      },
    });
  }

  updateQty(id: string, count: number): void {
    if (count < 1) return;

    this._CartService.updateProductQty(id, count).subscribe({
      next: (res) => {
        this.cart = res;
        this._ToastrService.success('Product Updated Successfully', '', {
          progressBar: true,
          timeOut: 1500,
        });
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error updating quantity:', err);
        this._ToastrService.error('Failed to update product quantity', '', {
          progressBar: true,
          timeOut: 1500,
        });
      },
    });
  }

  clearCart(): void {
    this._CartService.clearCart().subscribe({
      next: (res) => {
        this._CartService.cartCounter.next(0);
        this.cart = null;
        this._ToastrService.success('Cart has been cleared', '', {
          progressBar: true,
          timeOut: 1500,
        });
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error clearing cart:', err);
        this._ToastrService.error('Failed to clear cart', '', {
          progressBar: true,
          timeOut: 1500,
        });
      },
    });
  }
}
