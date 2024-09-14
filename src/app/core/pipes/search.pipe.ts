import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from '../interfaces/product';

@Pipe({
  name: 'search',
  standalone: true,
})
export class SearchPipe implements PipeTransform {
  transform(products: IProduct[], searchTerm: string) {
    if (!products || !searchTerm) return products;
    return products.filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
}
