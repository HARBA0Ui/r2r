import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../classes/product';
import { CardComponent } from "../card/card.component";
import { SpinnerComponent } from "../spinner/spinner.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-productsbycategory',
  standalone: true,
  templateUrl: './productsbycategory.component.html',
  styleUrls: ['./productsbycategory.component.css'],
  imports: [CardComponent, SpinnerComponent, CommonModule],
})
export class ProductsbycategoryComponent implements OnInit {
  products: Product[] = [];
  category: string = '';
  isLoading: boolean = false;

  constructor(private route: ActivatedRoute, private productService: ProductService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.category = params.get('category') || ''; // Get the 'category' from the URL
      this.fetchProductsByCategory();
    });
  }

  fetchProductsByCategory(): void {
    if (!this.category) return;

    this.isLoading = true;
    this.productService.getProductsByCategory(this.category).subscribe(
      (products:any) => {
        console.log("products by category: ", products)
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
