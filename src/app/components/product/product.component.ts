import { IProduct } from './../../core/interfaces/product';
import { ProductsService } from '../../core/services/products.service';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent implements OnInit {
  constructor(private _ProductsService: ProductsService) {}

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

  ngOnInit(): void {
    this.getProducts();
  }

  preventNavigation(event: Event) {
    event.stopPropagation();
  }
}
