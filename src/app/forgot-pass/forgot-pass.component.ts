import { Router } from '@angular/router';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AlertErrorComponent } from '../shared/ui/alert-error/alert-error.component';
import { AuthService } from '../core/services/auth.service';
import { signupValidators } from '../shared/validators/register.validators';
('rxjs');
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-forgot-pass',
  standalone: true,
  imports: [ReactiveFormsModule, AlertErrorComponent],
  templateUrl: './forgot-pass.component.html',
  styleUrl: './forgot-pass.component.scss',
})
export class ForgotPassComponent {
  constructor(private _AuthService: AuthService, private _Router: Router) {}
  step: number = 1;
  isBtnSubmit: boolean = false;
  msgError: string = '';

  verifyEmail = new FormGroup({
    email: new FormControl(null, signupValidators.email),
  });

  verifyCode = new FormGroup({
    resetCode: new FormControl(null, [Validators.required]),
  });

  resetPass = new FormGroup({
    email: new FormControl(null, signupValidators.email),
    newPassword: new FormControl(null, signupValidators.password),
  });

  verifyEmailSubmit(): void {
    let userEmail = this.verifyEmail.get('email')?.value;
    this.resetPass.get('email')?.patchValue(userEmail!);
    this.isBtnSubmit = true;
    this._AuthService.emailVerify(this.verifyEmail.value).subscribe({
      next: (res) => {
        console.log(res);
        this.isBtnSubmit = false;

        if (res.statusMsg == 'success') {
          this.msgError = '';
          this.step = 2;
        }
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
        this.msgError = err.error.message;
        this.isBtnSubmit = false;
      },
    });
  }

  verifyCodeSubmit(): void {
    this.isBtnSubmit = true;
    this._AuthService.resetCode(this.verifyCode.value).subscribe({
      next: (res) => {
        console.log(res);
        this.isBtnSubmit = false;

        if (res.status == 'Success') {
          this.msgError = '';
          this.step = 3;
        }
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
        this.msgError = err.error.message;
        this.isBtnSubmit = false;
      },
    });
  }

  resetPasswordSubmit(): void {
    this.isBtnSubmit = true;
    this._AuthService.resetPassword(this.resetPass.value).subscribe({
      next: (res) => {
        console.log(res);
        this.isBtnSubmit = false;
        localStorage.setItem('token', res.token);
        this._AuthService.saveUserData();
        this._Router.navigate(['/home']);
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
        this.msgError = err.error.message;
        this.isBtnSubmit = false;
      },
    });
  }
}
