import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from '../../environment/environment.local';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private _HttpClient: HttpClient) {}
  headers = {
    token: localStorage.getItem('token')!,
  };

  cartCounter: BehaviorSubject<number> = new BehaviorSubject(0);

  resetCartCounter(): void {
    this.cartCounter.next(0);
  }

  addProductToCart = (productId: string): Observable<any> => {
    return this._HttpClient.post(baseUrl + 'api/v1/cart', {
      productId: productId,
    });
  };

  updateProductQty = (productId: string, count: number): Observable<any> => {
    return this._HttpClient.put(baseUrl + 'api/v1/cart/' + productId, {
      count: count,
    });
  };

  removeItem = (productId: string): Observable<any> => {
    return this._HttpClient.delete(baseUrl + 'api/v1/cart/' + productId);
  };

  clearCart = (): Observable<any> => {
    return this._HttpClient.delete(baseUrl + 'api/v1/cart');
  };

  getLoggedUserCart = (): Observable<any> => {
    return this._HttpClient.get(baseUrl + 'api/v1/cart');
  };
}
