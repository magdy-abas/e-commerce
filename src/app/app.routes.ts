import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { CartComponent } from './components/cart/cart.component';
import { BrandsComponent } from './components/brands/brands.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { WishListComponent } from './components/wish-list/wish-list.component';
import { authGuard } from './core/guards/auth.guard';
import { isLoggedInGuard } from './core/guards/is-logged-in.guard';

export const routes: Routes = [
  {
    //path:'auth'
    path: '',
    component: AuthLayoutComponent,
    canActivate: [isLoggedInGuard],
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent, title: 'Login' },
      { path: 'register', component: RegisterComponent, title: 'Register' },
    ],
  },
  {
    //path:'blank'
    path: '',
    component: BlankLayoutComponent,
    canActivate: [authGuard],

    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent, title: 'Home' },
      { path: 'products', component: ProductsComponent, title: 'Products' },
      { path: 'cart', component: CartComponent, title: 'Cart' },
      { path: 'brands', component: BrandsComponent, title: 'Brands' },
      {
        path: 'categories',
        component: CategoriesComponent,
        title: 'Categories',
      },
      { path: 'wishlist', component: WishListComponent, title: 'WishList' },
    ],
  },
  { path: '**', component: NotFoundComponent, title: 'Not Found' },
];
