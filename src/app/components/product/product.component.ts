import { IProduct } from './../../core/interfaces/product';
import { ProductsService } from '../../core/services/products.service';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent implements OnInit {
  constructor(
    private _ProductsService: ProductsService,
    private _CartService: CartService,
    private _ToastrService: ToastrService
  ) {}

  allProducts: IProduct[] = [];

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

  ngOnInit(): void {
    this.getProducts();
  }

  preventNavigation(event: Event) {
    event.stopPropagation();
  }
}
