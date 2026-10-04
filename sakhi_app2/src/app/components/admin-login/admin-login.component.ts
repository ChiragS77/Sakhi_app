import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminauthService } from 'src/app/services/adminauth.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
  loginForm: FormGroup;

  loading = false;
  errorMessage = '';
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private adminAuthService: AdminauthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {

    this.errorMessage = '';

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loading = true;

    this.adminAuthService
      .login(this.loginForm.value)
      .subscribe({

        next: () => {
          this.loading = false;
          this.router.navigate(['/admin/dashboard']);
        },

        error: (error) => {

          this.loading = false;

          if (error.status === 401) {
            this.errorMessage = 'Invalid username or password.';
          } else {
            this.errorMessage =
              'Unable to login. Please try again.';
          }
        }
      });
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }
}
