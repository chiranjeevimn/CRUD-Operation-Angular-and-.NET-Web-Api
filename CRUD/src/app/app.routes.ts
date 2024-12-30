import { Routes } from '@angular/router';
import { ProductComponent } from './Component/product/product.component';
import { HomeComponent } from './Component/home/home.component';
import { CategoryComponent } from './Component/category/category.component';
import { ContactComponent } from './Component/contact/contact.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'Home', component: HomeComponent },
    { path: 'Product', component: ProductComponent },
    { path: 'Category', component: CategoryComponent},
    { path: 'Contact', component: ContactComponent},
];
