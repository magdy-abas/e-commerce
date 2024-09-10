import { Component } from '@angular/core';
import { ProductComponent } from '../product/product.component';
import { SliderComponent } from '../main-slider/slider.component';
import { CategoriesSliderComponent } from '../categories-slider/categories-slider.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductComponent, SliderComponent, CategoriesSliderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor() {}
}
