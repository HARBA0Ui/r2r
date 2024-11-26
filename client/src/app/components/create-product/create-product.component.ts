import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SpinnerComponent } from '../spinner/spinner.component';
import { Category } from '../../classes/category';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [FormsModule, SpinnerComponent],
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css'],
})
export class CreateProductComponent implements OnInit {
  product: any = {
    title: '',
    desc: '',
    price: 40,
    category: '',
    isAvailable: true,
    requiredLevel: 1,
    imgs: [],
  };
  categories: Category[] = [];
  isLoading: boolean = false;
  images: File[] = [];

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.productService.getCategories().subscribe(
      (categories) => {
        this.categories = categories;
        console.log('categories: ', categories);
      },
      (error) => {
        console.error('Error fetching categories:', error);
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
      formData.append('title', this.product.title);
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
      this.productService.createProduct(formData).subscribe(
        (response) => {
          console.log('Product created:', response);
          this.isLoading = false;
          alert("the product has been created successfully!")
          location.reload();
        },
        (error) => {
          console.error('Error creating product:', error);
          this.isLoading = false;
        }
      );
    }
  }
}
