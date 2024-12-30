import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';  // Import your Product model

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:5070/api/Product';

  constructor(private http: HttpClient) {}

  

  // Add a new product (POST)
  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  // Update an existing product (PUT)
  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}`, product);
  }

  // Fetch products with pagination
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  // Delete a product (DELETE)
  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
