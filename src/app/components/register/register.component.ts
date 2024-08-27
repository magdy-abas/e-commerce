import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AlertErrorComponent } from '../../shared/ui/alert-error/alert-error.component';
import { confirmPassword } from '../../shared/utilities/confirm-password.utils';
import { signupValidators } from '../../shared/validators/register.validators';
import { AuthService } from '../../core/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, AlertErrorComponent, NgClass],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  constructor(private _AuthService: AuthService, private _Router: Router) {}

  msgError: string = '';
  isLoading: boolean = false;

  registerForm: FormGroup = new FormGroup(
    {
      name: new FormControl(null, signupValidators.name),
      email: new FormControl(null, signupValidators.email),
      password: new FormControl(null, signupValidators.password),
      rePassword: new FormControl(null),
    },
    confirmPassword
  );

  isFieldValid(fieldName: string): boolean {
    const field = this.registerForm.get(fieldName);
    return !!(!field?.errors && (field?.dirty || field?.touched));
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.registerForm.get(fieldName);
    return !!(field?.errors && (field?.dirty || field?.touched));
  }

  sendData(): void {
    if (this.registerForm.valid) {
      console.log(this.registerForm);
      this.isLoading = true;
      this._AuthService.register(this.registerForm.value).subscribe({
        next: (res) => {
          //navigate to sign in
          this._Router.navigate(['/login']);
          this.isLoading = false;
        },
        error: (err: HttpErrorResponse) => {
          this.msgError = err.error.message;
          this.isLoading = false;
        },
      });
    } else {
      this.registerForm.markAllAsTouched();
      this.registerForm.get('rePassword')?.setValue('');
    }
  }
}
