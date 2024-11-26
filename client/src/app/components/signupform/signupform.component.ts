import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signupform',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './signupform.component.html',
  styleUrls: ['./signupform.component.css'],
})
export class SignupformComponent {
  signinForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    validepassword: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    isAdmin: new FormControl(false), // Default to not admin
  });

  passwordsMismatch: boolean | undefined;

  private readonly router: Router = inject(Router);
  private readonly authService: AuthService = inject(AuthService);

  onSubmit(): void {
    const password = this.signinForm.get('password')?.value;
    const validepassword = this.signinForm.get('validepassword')?.value;

    if (password !== validepassword) {
      this.passwordsMismatch = true;
      console.error('Passwords do not match');
      return;
    }

    this.passwordsMismatch = false;

    if (this.signinForm.valid) {
      const { email, password, firstName, lastName, isAdmin } =
        this.signinForm.value;

      this.authService
        .register(email, password, firstName, lastName, isAdmin)
        .subscribe(
          (response: any) => {
            console.log('Registration successful:', response);
            alert('Registration successful!');
            this.router.navigate(['/login']);
          },
          (err: any) => {
            console.error('Registration failed:', err);

            // Check if the error has a specific message
            if (err?.error?.error === 'Email already in use!') {
              alert('The email address is already in use. Please try another.');
            } else {
              alert('Registration failed. Please try again later.');
            }
          }
        );
    } else {
      alert('Form is invalid');
    }
  }
}
