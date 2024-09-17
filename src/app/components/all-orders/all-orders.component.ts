import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../core/services/order.service';
import { CartService } from '../../core/services/cart.service';
import { CurrencyPipe, NgClass, NgFor } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { IOrders } from '../../core/interfaces/order';

@Component({
  selector: 'app-all-orders',
  standalone: true,
  imports: [NgFor, CurrencyPipe, NgClass],

  templateUrl: './all-orders.component.html',
  styleUrl: './all-orders.component.scss',
})
export class AllOrdersComponent {
  constructor(
    private _OrderService: OrderService,
    private _AuthService: AuthService
  ) {}
  userId: string = '';
  allOrders: IOrders[] = [];

  ngOnInit(): void {
    this._AuthService.saveUserData();
    this.userId = this._AuthService.userData.id;

    this._OrderService.getUserOrders(this.userId).subscribe({
      next: (res) => {
        console.log(res);

        this.allOrders = res;
      },
    });
  }
}
