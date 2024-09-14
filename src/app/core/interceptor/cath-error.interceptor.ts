import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const cathErrorInterceptor: HttpInterceptorFn = (req, next) => {
  let toastr = inject(ToastrService);
  if (req.url.includes('auth')) {
    return next(req).pipe(
      catchError((err) => {
        toastr.error(err.error.message);
        return throwError(() => err);
      })
    );
  }
  return next(req).pipe(
    catchError((err) => {
      toastr.error('Server error. Please try again.');
      return throwError(() => err);
    })
  );
};
