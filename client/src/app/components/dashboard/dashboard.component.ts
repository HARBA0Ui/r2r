import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  authService: AuthService = inject(AuthService);
  router: Router = inject(Router);

  onLogout() {
    console.log("test test aywa aywa");
    this.authService.logout().subscribe(
      () => {
        // Navigate to the login or home page
        this.router.navigate(['/login']);
      },
      (error) => {;
        console.error('Logout failed:', error);
      }
    );
  }
}
