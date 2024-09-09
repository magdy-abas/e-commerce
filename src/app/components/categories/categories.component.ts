import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../core/services/categories.service';
import { ICategory } from '../../core/interfaces/category';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent implements OnInit {
  constructor(private _CategoriesService: CategoriesService) {}

  categories: ICategory[] = [];

  getCategories = () => {
    this._CategoriesService.getAllCategories().subscribe({
      next: (res) => {
        this.categories = res.data;
      },
      error(err) {
        console.log(err);
      },
    });
  };

  ngOnInit(): void {
    this.getCategories();
  }
}
