import { Component, HostListener } from '@angular/core';
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

  goToTop() {
    window.scrollTo(0, 0);
  }

  showBtn: boolean = false;
  @HostListener('window:scroll') scrollToTop() {
    let scrollTop = document.documentElement.scrollTop;

    if (scrollTop > 500) {
      this.showBtn = true;
    } else {
      this.showBtn = false;
    }
  }
}
