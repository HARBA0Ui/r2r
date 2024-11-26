import { Component, OnInit, inject } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../classes/product';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'app-main-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, SpinnerComponent],
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.css'],
})
export class MainDashboardComponent implements OnInit {
  products: Product[] = [];
  productService = inject(ProductService);

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe(
      (products: Product[]) => {
        this.products = products;
        console.log(products);
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  onDeleteProduct(id: string): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id).subscribe(
        () => {
          this.products = this.products.filter((product) => product.id !== id);
          console.log(`Product with ID ${id} deleted successfully.`);
        },
        (error) => {
          console.error('Error deleting product:', error);
        }
      );
    }
  }
}
