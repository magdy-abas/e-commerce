import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { OrderService } from '../../core/services/order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-cash-payment',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './cash-payment.component.html',
  styleUrl: './cash-payment.component.scss',
})
export class CashPaymentComponent {
  constructor(
    private _FormBuilder: FormBuilder,
    private _order: OrderService,
    private _ActivatedRoute: ActivatedRoute,
    private _router: Router,
    private _CartService: CartService
  ) {}

  cartId: string = '';
  addressForm: FormGroup = this._FormBuilder.group({
    details: [null],
    phone: [null],
    city: [null],
  });

  cashPayment = (): void => {
    this._order.cashOrder(this.cartId, this.addressForm.value).subscribe({
      next: (res) => {
        console.log(res);
        this._CartService.resetCartCounter();
        this._router.navigate(['/allorders']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  };
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (prams) => {
        this.cartId = prams.get('id')!;
      },
    });
  }
}
