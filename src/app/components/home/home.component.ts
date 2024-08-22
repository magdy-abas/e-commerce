import { IProduct } from './../../core/interfaces/product';
import { ProductsService } from '../../core/services/products.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
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
}
