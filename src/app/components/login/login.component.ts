import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { AlertErrorComponent } from '../../shared/ui/alert-error/alert-error.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, AlertErrorComponent, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(
    private _FormBuilder: FormBuilder,
    private _AuthService: AuthService,
    private _Router: Router
  ) {}

  isBtnSubmit = false;
  msgError = '';
  loginForm = this._FormBuilder.group({
    email: [null, []],
    password: [null, []],
  });

  sendData() {
    if (this.loginForm.valid) {
      this.isBtnSubmit = true;
      this._AuthService.login(this.loginForm.value).subscribe({
        next: (res) => {
          console.log(res);
          localStorage.setItem('token', res.token);
          this._AuthService.saveUserData();
          this._Router.navigate(['/home']);
          this.isBtnSubmit = false;
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
          this.msgError = err.error.message;
          this.isBtnSubmit = false;
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
