import { Component } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ICart } from '../../core/interfaces/cart';
import { CurrencyPipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  constructor(
    private _CartService: CartService,
    private _ToastrService: ToastrService
  ) {}

  cart: ICart = {} as ICart;
  getUserCart = () => {
    this._CartService.getLoggedUserCart().subscribe({
      next: (res) => {
        this.cart = res;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
  };

  deleteItem = (id: string) => {
    this._CartService.removeItem(id).subscribe({
      next: (res) => {
        console.log(res);
        this.cart = res;
        this._ToastrService.success('Product Deleted Successfully', '', {
          progressBar: true,
          timeOut: 1500,
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  };

  updateQty = (id: string, count: number) => {
    this._CartService.updateProductQty(id, count).subscribe({
      next: (res) => {
        console.log(res);
        this.cart = res;
        this._ToastrService.success('Product Updated Successfully', '', {
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
    this.getUserCart();
  }
}
