import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  standalone: true,
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cart: any[] = [];

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.cart = JSON.parse(localStorage.getItem('cart') || '[]');
  }

  removeFromCart(productId: string): void {
    this.cart = this.cart.filter((item) => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  clearCart(): void {
    this.cart = [];
    localStorage.removeItem('cart');
  }
}