import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../classes/product';
import { SpinnerComponent } from '../components/spinner/spinner.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-product',
  standalone: true,
  imports: [SpinnerComponent, FormsModule, CommonModule],
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.css',
})
export class UpdateProductComponent implements OnInit {
  product: Product | null = null;
  categories: string[] = ['TSHIRT', 'HOODIE', 'JEANS'];
  isLoading = false;
  images: File[] = [];

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.isLoading = true;
    this.productService.getProductById(id).subscribe(
      (data) => {
        this.product = data;
        this.isLoading = false;
      },
      (error) => {
        console.error(error);
        this.isLoading = false;
      }
    );
  }

  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      this.images = event.target.files;
    }
  }

  onSubmit(form: any): void {
    if (this.product) {
      const formData = new FormData();
      formData.append('title', this.product.title); // Directly using this.product values
      formData.append('desc', this.product.desc);
      formData.append('price', this.product.price.toString());
      formData.append('category', this.product.category);
      formData.append(
        'isAvailable',
        this.product.isAvailable ? 'true' : 'false'
      );
      formData.append('requiredLevel', this.product.requiredLevel.toString());

      // Add images
      for (let i = 0; i < this.images.length; i++) {
        formData.append('images', this.images[i], this.images[i].name);
      }

      this.isLoading = true;
      const id = this.route.snapshot.paramMap.get('id')!;
      this.productService.updateProduct(id, formData).subscribe(
        (response) => {
          console.log('response', response);
          this.isLoading = false;
          window.location.reload();
        },
        (error) => {
          console.error(error);
          this.isLoading = false;
        }
      );
    }
  }

}
