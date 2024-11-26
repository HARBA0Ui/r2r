import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../classes/product';
import { ProductService } from '../../services/product.service';
import { SpinnerComponent } from "../spinner/spinner.component";
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [SpinnerComponent, CardComponent],
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css'],
})
export class SearchPageComponent implements OnInit {
  label: string = '';
  products: Product[] = []; 
  productService: ProductService = inject(ProductService); 

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    
    this.route.paramMap.subscribe((params) => {
      this.label = params.get('label') || ''; 
      // console.log('Search Label:', this.label);

      this.productService.getProductsByTitle(this.label).subscribe(
        (products: any) => {
          this.products = products.product; 
          console.log("products searched: ", products);
        },
        (error) => {
          console.error('Error fetching products:', error);
        }
      );
    });
  }
}
