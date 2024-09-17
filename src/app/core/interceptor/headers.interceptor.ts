import { HttpInterceptorFn } from '@angular/common/http';

export const headersInterceptor: HttpInterceptorFn = (req, next) => {
  if (
    req.url.includes('cart') ||
    req.url.includes('categories') ||
    req.url.includes('wishlist') ||
    req.url.includes('orders')
  ) {
    req = req.clone({
      setHeaders: {
        token: localStorage.getItem('token')!,
      },
    });
  }

  return next(req);
};
