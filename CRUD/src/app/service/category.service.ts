import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';  
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = 'http://localhost:5070/api/Category';

  constructor(private http: HttpClient) {}

  // Fetch all products
  getCatagory(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
  deleteCatagory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  addCatagory(category: Category): Observable<Category> {
      return this.http.post<Category>(this.apiUrl, category);
    }
  
    // Update an existing product (PUT)
    updateCatagory(category: Category): Observable<Category> {
      return this.http.put<Category>(`${this.apiUrl}`, category);
    }
}