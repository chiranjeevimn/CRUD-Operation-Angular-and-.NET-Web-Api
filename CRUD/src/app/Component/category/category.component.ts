import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../service/category.service';
import { Category } from '../../models/category.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-category',
  standalone: true,  // Ensures the component is standalone
  imports: [CommonModule, ReactiveFormsModule],  // Import necessary modules
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categories: Category[] = [];  // List of categories
  categoryForm: FormGroup;  // Form to add or update a category
  editingCategoryId: number | null = null;  // Track the category being edited

  constructor(
    private categoryService: CategoryService, 
    private fb: FormBuilder
  ) {
    // Initialize the form for category
    this.categoryForm = this.fb.group({
      categoryId: [null],
      name: ['', Validators.required],  // Category name is required
    });
  }

  ngOnInit(): void {
    this.loadCategories();  // Load categories on component initialization
  }

  // Load all categories from the service
  loadCategories(): void {
    this.categoryService.getCatagory().subscribe(
      (data) => {
        this.categories = data;  // Assign the fetched categories to the component variable
      },
      (error) => {
        console.error('Error fetching categories:', error);
        alert('Failed to load categories.');
      }
    );
  }

  // Add or update a category
  addCategory(): void {
    if (this.categoryForm.valid) {
      const categoryData: Category = this.categoryForm.value;

      if (this.editingCategoryId === null) {
        // Add new category
        this.categoryService.addCatagory(categoryData).subscribe(
          () => {
            alert('Category Added Successfully');
            this.loadCategories();  // Reload the categories list
            this.categoryForm.reset();  // Reset the form
          },
          (error) => {
            console.error('Error adding category:', error);
            alert('Failed to add category');
          }
        );
      } else {
        // Update existing category
        categoryData.categoryId = this.editingCategoryId;  // Set the categoryId for update
        this.categoryService.updateCatagory(categoryData).subscribe(
          () => {
            alert('Category Updated Successfully');
            this.loadCategories();  // Reload the categories list
            this.categoryForm.reset();  // Reset the form
            this.editingCategoryId = null;  // Reset the editing state
          },
          (error) => {
            console.error('Error updating category:', error);
            alert('Failed to update category');
          }
        );
      }
    } else {
      alert('Please fill in all required fields.');
    }
  }

  // Edit an existing category
  editCategory(category: Category): void {
    this.editingCategoryId = category.categoryId;  // Set the category ID to be edited
    this.categoryForm.patchValue(category);  // Populate the form with category data
  }

  // Delete a category
  deleteCategory(id: number): void {
    if (confirm('Are you sure you want to delete this category?')) {
      this.categoryService.deleteCatagory(id).subscribe(
        () => {
          alert('Category Deleted Successfully');
          this.loadCategories();  // Reload the categories list
        },
        (error) => {
          console.error('Error deleting category:', error);
          alert('Failed to delete category');
        }
      );
    }
  }
}
