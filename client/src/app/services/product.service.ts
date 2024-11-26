import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../classes/product';
import { Category } from '../classes/category';
import { API_BASE_URL } from '../shared/config';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = API_BASE_URL + "products";

  constructor(private http: HttpClient) {}


  getAllProducts(page: number= 1, limit: number= 20): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}?page=${page}&limit=${limit}`);
  }


  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }


  getProductsByCategory(category: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/category/${category}`);
  }
  getProductsByGender(gender: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/gender/${gender}`);
  }


  getProductsByLevel(level: number, page: number= 1, limit: number= 24): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/level/${level}`);
  }

  getProductsByTitle(title: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/search/${title}`);
  }


  createProduct(productData: FormData): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}`, productData);
  }


  updateProduct(id: string, productData: FormData): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, productData);
  }


  deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }


  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/categories/get`);
  }
}
