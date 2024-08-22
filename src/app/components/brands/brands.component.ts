import { Component, OnInit } from '@angular/core';
import { BrandsService } from '../../core/services/brands.service';
import { IBrand } from '../../core/interfaces/brand';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss',
})
export class BrandsComponent implements OnInit {
  constructor(private _BrandsService: BrandsService) {}

  brands: IBrand[] = [];

  getBrands = (): void => {
    this._BrandsService.getBrands().subscribe({
      next: (res) => {
        this.brands = res.data;
      },
      error(err) {
        console.log(err);
      },
    });
  };

  ngOnInit(): void {
    this.getBrands();
  }
}
