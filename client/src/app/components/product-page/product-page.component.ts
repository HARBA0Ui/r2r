import { Component, inject } from '@angular/core';
import { Product } from '../../classes/product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { SpinnerComponent } from '../spinner/spinner.component';
import { CartService } from '../../services/cart.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [SpinnerComponent, ReactiveFormsModule],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css',
})
export class ProductPageComponent {
  product!: Product; 
  productService: ProductService = inject(ProductService); 

  cityOptions: string[] = [
    'Ariana',
    'Beja',
    'Ben Arous',
    'Bizerte',
    'Gabes',
    'Gafsa',
    'Jendouba',
    'Kasserine',
    'Kef',
    'Mahdia',
    'Manouba',
    'Monastir',
    'Nabeul',
    'Sfax',
    'Sidi Bouzid',
    'Sousse',
    'Siliana',
    'Tataouine',
    'Tozeur',
    'Tunis',
    'Zaghouan',
    'Medenine',
    'Kebili',
    'Kairouan',
  ];

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private fb: FormBuilder
  ) {}

  orderForm!: FormGroup;

  ngOnInit(): void {
    
    this.orderForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      tel: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
      email: ['', [Validators.required, Validators.email]],
      city: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
    });

    
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.productService.getProductById(productId).subscribe(
        (product) => (this.product = product),
        (error) => console.error('Error fetching product:', error)
      );
    }
  }

  addToCart(e: Event): void {
    e.preventDefault();
    this.cartService.addToCart(this.product);
    alert('Product added to cart!');
  }
}
