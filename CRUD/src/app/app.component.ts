import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './Component/header/header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductComponent } from './Component/product/product.component';
import { HomeComponent } from './Component/home/home.component';
import { CategoryComponent } from './Component/category/category.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,HeaderComponent,ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'crud';
}
