import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { OrderService } from '../../core/services/order.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-address',
  standalone: true,
  imports: [ReactiveFormsModule],
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
    address: [null],
    phone: [null],
    city: [null],
  });

  payment = (): void => {
    console.log(this.addressForm.value);

    this._order.createSession(this.cartId, this.addressForm.value).subscribe({
      next: (res) => {
        console.log(res);
        const sessionUrl = res.session.url;
        this._CartService.resetCartCounter();
        window.location.href = sessionUrl;
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
