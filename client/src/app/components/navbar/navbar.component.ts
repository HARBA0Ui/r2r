import { Component, OnInit } from '@angular/core';
import { LogoComponent } from '../logo/logo.component';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [LogoComponent, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  cartItemsCount: number = 0;

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    // Subscribe to cart count updates
    this.cartService.cartCount$.subscribe((count) => {
      this.cartItemsCount = count;
    });
  }

  onSearch(e: Event, label: string) {
    e.preventDefault();
    this.router.navigate(['/search', label.trim()]);
  }
}
