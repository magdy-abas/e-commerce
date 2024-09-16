import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { IProduct } from '../../core/interfaces/product';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent implements OnInit {
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _ProductsService: ProductsService
  ) {}

  product: IProduct = {} as IProduct;

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
