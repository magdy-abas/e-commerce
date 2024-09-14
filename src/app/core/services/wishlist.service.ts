import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { baseUrl } from '../../environment/environment.local';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  constructor(private _HttpClient: HttpClient) {}
  wishCounter: BehaviorSubject<number> = new BehaviorSubject(0);
  addProductToWishlist = (productId: string): Observable<any> => {
    return this._HttpClient.post(baseUrl + 'api/v1/wishlist', {
      productId: productId,
    });
  };

  removeProductFromWishlist = (productId: string): Observable<any> => {
    return this._HttpClient.delete(baseUrl + 'api/v1/wishlist/' + productId);
  };

  getLoggedUserWishlist = (): Observable<any> => {
    return this._HttpClient.get(baseUrl + 'api/v1/wishlist');
  };
}
