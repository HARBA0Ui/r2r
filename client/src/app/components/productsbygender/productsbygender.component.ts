import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../classes/product';
import { SpinnerComponent } from "../spinner/spinner.component";
import { CardComponent } from "../card/card.component";

@Component({
  selector: 'app-productsbygender',
  standalone: true,
  imports: [SpinnerComponent, CardComponent],
  templateUrl: './productsbygender.component.html',
  styleUrl: './productsbygender.component.css',
})
export class ProductsbygenderComponent {
  products: Product[] = [];
  gender: string = '';
  isLoading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.gender = params.get('gender') || ''; // Get the 'category' from the URL
      this.fetchProductsByGender();
    });
  }

  fetchProductsByGender(): void {
    if (!this.gender) return;

    this.isLoading = true;
    this.productService.getProductsByGender(this.gender).subscribe(
      (products: any) => {
        console.log('products by gender: ', products);
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
