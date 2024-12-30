import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../service/product.service';
import { Product } from '../../models/product.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-product',
  standalone: true, // Ensures the component is standalone
  imports: [CommonModule, ReactiveFormsModule], // Import necessary modules
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  productForm: FormGroup;
  editingProductId: number | null = null; // Track the product being edited

  constructor(private productService: ProductService, private fb: FormBuilder) {
    this.productForm = this.fb.group({
      productId: [null],
      name: ['', Validators.required],
      salesPrice: [0, [Validators.required, Validators.min(0)]],
      mrp: [0, [Validators.required, Validators.min(0)]],
      categoryId: [0, Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(
      (data) => {
        this.products = data;
      },
      (error) => {
        console.error('Error fetching products:', error);
        alert('Failed to load products.');
      }
    );
  }

  addProduct(): void {
    if (this.productForm.valid) {
      const productData: Product = this.productForm.value;
  
      if (this.editingProductId === null) {
        // Add new product
        this.productService.addProduct(productData).subscribe(
          () => {
            alert('Product Added Successfully');
            this.loadProducts();
            this.productForm.reset();
          },
          (error) => {
            console.error('Error adding product:', error);
            alert('Failed to add product');
          }
        );
      } else {
        // Update existing product
        productData.productId = this.editingProductId; // Ensure productId is set
        this.productService.updateProduct(productData).subscribe(
          () => {
            alert('Product Updated Successfully');
            this.loadProducts();
            this.productForm.reset();
            this.editingProductId = null; // Reset editing state
          },
          (error) => {
            console.error('Error updating product:', error);
            alert('Failed to update product');
          }
        );
      }
    } else {
      alert('Please fill in all required fields.');
    }
  }
  

  editProduct(product: Product): void {
    this.editingProductId = product.productId; // Set the editing product ID
    this.productForm.patchValue(product); // Populate form with product data
  }

  delete(id: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id).subscribe(
        () => {
          alert('Product Deleted Successfully');
          this.loadProducts();
        },
        (error) => {
          console.error('Error deleting product:', error);
          alert('Failed to delete product');
        }
      );
    }
  }
}