import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../classes/product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: any[] = JSON.parse(localStorage.getItem('cart') || '[]');
  private cartCount = new BehaviorSubject<number>(this.cartItems.length);

  cartCount$ = this.cartCount.asObservable(); // Observable for cart count

  addToCart(product: Product): void {
    const existingItemIndex = this.cartItems.findIndex((item) => item.id === product.id);

    if (existingItemIndex !== -1) {
      this.cartItems[existingItemIndex].quantity += 1;
    } else {
      this.cartItems.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(this.cartItems));
    this.cartCount.next(this.cartItems.length); // Emit the updated count
  }

  getCartItems(): Product[] {
    return this.cartItems;
  }
}
