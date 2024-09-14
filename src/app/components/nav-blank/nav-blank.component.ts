import { Component, SimpleChanges } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CartService } from '../../core/services/cart.service';
import { WishlistService } from '../../core/services/wishlist.service';

@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-blank.component.html',
  styleUrl: './nav-blank.component.scss',
})
export class NavBlankComponent {
  constructor(
    public _AuthService: AuthService,
    private _CartService: CartService,
    private _WishlistService: WishlistService
  ) {}

  cartCounter: number = 0;
  wishCounter: number = 0;

  getUserCart = () => {
    this._CartService.getLoggedUserCart().subscribe({
      next: (res) => {
        this._CartService.cartCounter.next(res.numOfCartItems);
      },
    });
  };

  getWishList = () => {
    this._WishlistService.getLoggedUserWishlist().subscribe({
      next: (res) => {
        this._WishlistService.wishCounter.next(res.data.length);
      },
    });
  };

  ngOnInit(): void {
    this.getUserCart();
    this.getWishList();
    this._CartService.cartCounter.subscribe({
      next: (counter) => {
        this.cartCounter = counter;
      },
    });

    this._WishlistService.wishCounter.subscribe({
      next: (counter) => {
        this.wishCounter = counter;
      },
    });
  }
}
