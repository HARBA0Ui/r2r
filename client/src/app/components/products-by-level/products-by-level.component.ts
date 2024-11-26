import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../classes/product';
import { CardComponent } from '../card/card.component';
import { SpinnerComponent } from '../spinner/spinner.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products-by-level',
  standalone: true,
  imports: [CardComponent, SpinnerComponent, CommonModule],
  templateUrl: './products-by-level.component.html',
  styleUrl: './products-by-level.component.css',
})
export class ProductsByLevelComponent implements OnInit {
  products: Product[] = [];
  level: string = '';
  isLoading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.level = params.get('level') || ''; // Get the 'level' from the URL
      this.fetchProductsByCategory();
    });
  }

  fetchProductsByCategory(): void {
    if (!this.level) return;

    this.isLoading = true;
    this.productService.getProductsByLevel(parseInt(this.level)).subscribe(
      (products: any) => {
        console.log('products by level: ', products);
        this.products = products.products;
        this.isLoading = false;
      },
      (err) => {
        console.error('Error fetching products:', err);
        this.products = [];
        this.isLoading = false;
      }
    );
  }
}
