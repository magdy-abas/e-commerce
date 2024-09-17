import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { OrderService } from '../../core/services/order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { AlertErrorComponent } from '../../shared/ui/alert-error/alert-error.component';

@Component({
  selector: 'app-cash-payment',
  standalone: true,
  imports: [ReactiveFormsModule, AlertErrorComponent],
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
    details: [null, [Validators.required]],
    phone: [null, [Validators.required]],
    city: [null, [Validators.required]],
  });

  cashPayment = (): void => {
    if (this.addressForm.valid) {
      this._order.cashOrder(this.cartId, this.addressForm.value).subscribe({
        next: (res) => {
          this._CartService.cartCounter.next(0);

          this._router.navigate(['/allorders']);
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else {
      this.addressForm.markAllAsTouched();
    }
  };

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (prams) => {
        this.cartId = prams.get('id')!;
      },
    });
  }
}
