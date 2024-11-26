import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-loginform',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, RouterLink],
  templateUrl: './loginform.component.html',
  styleUrl: './loginform.component.css'
})
export class LoginformComponent {

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  isLoading = false;
  errorMessage = '';

  router: Router = inject(Router);
  authService: AuthService = inject(AuthService);

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      const { email, password } = this.loginForm.value;
  
      this.authService.login(email, password).subscribe(
        (response) => {
          this.isLoading = false;
          console.log('successful - responese: ', response);
          localStorage.setItem('isLoggedIn', 'true'); 
          let isAdmin= (response.isAdmin==true)?"true": "false"
          localStorage.setItem('isAdmin', isAdmin); 

          if(isAdmin=="true"){
            this.router.navigate(['/dashboard']);
          }else{
            this.router.navigate(['/home']);
          }
        },
        (error) => {
          this.isLoading = false;
          this.errorMessage = 'Invalid email or password. Please try again.';
          console.error('Login failed:', error);
        }
      );
    } else {
      this.errorMessage = 'Please fill out the form correctly.';
    }
  }
  

  goBack() {
    this.router.navigate(['/homepage']);
  }
}
