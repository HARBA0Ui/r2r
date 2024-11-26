import { Component, OnInit, inject } from '@angular/core';
import { Product } from '../../classes/product';
import { ProductService } from '../../services/product.service';
import { SpinnerComponent } from "../spinner/spinner.component";
import { LevelsComponent } from "../levels/levels.component";
import { CardComponent } from '../../components/card/card.component'
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CardComponent, SpinnerComponent, LevelsComponent, RouterLink],
templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  products: Product[] = []; // Define a property to hold the products
  productService: ProductService = inject(ProductService); // Use inject() to inject the service directly

  ngOnInit(): void {
    // Call the getAllProducts method when the component is initialized
    this.productService.getAllProducts(1,8).subscribe(
      (products: Product[]) => {
        // this.products = products; // Store the fetched products in the component property
       this.products= products;
       console.log(products)
      },
      error => {
        console.error('Error fetching products:', error);
      }
    );
  }
}
