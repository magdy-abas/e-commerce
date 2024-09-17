import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { OrderService } from '../../core/services/order.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { AlertErrorComponent } from '../../shared/ui/alert-error/alert-error.component';

@Component({
  selector: 'app-address',
  standalone: true,
  imports: [ReactiveFormsModule, AlertErrorComponent],
  templateUrl: './address.component.html',
  styleUrl: './address.component.scss',
})
export class AddressComponent {
  constructor(
    private _FormBuilder: FormBuilder,
    private _order: OrderService,
    private _ActivatedRoute: ActivatedRoute,
    private _CartService: CartService
  ) {}
  cartId: string = '';
  addressForm: FormGroup = this._FormBuilder.group({
    address: [null, [Validators.required]],
    phone: [null, [Validators.required]],
    city: [null, [Validators.required]],
  });

  payment = (): void => {
    if (this.addressForm.valid) {
      this._order.createSession(this.cartId, this.addressForm.value).subscribe({
        next: (res) => {
          console.log(res);
          const sessionUrl = res.session.url;
          this._CartService.cartCounter.next(0);
          window.location.href = sessionUrl;
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
