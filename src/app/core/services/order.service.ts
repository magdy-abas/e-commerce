import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from '../../environment/environment.local';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private _httpClient: HttpClient) {}

  createSession = (
    cartId: string,
    shippingAddress: object
  ): Observable<any> => {
    return this._httpClient.post(
      baseUrl +
        'api/v1/orders/checkout-session/' +
        cartId +
        `?url=https://e-commerce-git-main-magdy-abas-projects.vercel.app`,
      { shippingAddress }
    );
  };

  cashOrder = (cartId: string, shippingAddress: object): Observable<any> => {
    return this._httpClient.post(baseUrl + 'api/v1/orders/' + cartId, {
      shippingAddress,
    });
  };

  getAllOrders = (userId: string): Observable<any> => {
    return this._httpClient.get(baseUrl + 'api/v1/orders/' + userId);
  };

  getUserOrders = (userId: string): Observable<any> => {
    return this._httpClient.get(baseUrl + 'api/v1/orders/user/' + userId);
  };
}
