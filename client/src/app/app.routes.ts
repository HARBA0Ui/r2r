import { Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ProductPageComponent } from './components/product-page/product-page.component';
import { SignupformComponent } from './components/signupform/signupform.component';
import { LoginformComponent } from './components/loginform/loginform.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SearchPageComponent } from './components/search-page/search-page.component';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { MainDashboardComponent } from './components/main-dashboard/main-dashboard.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { authGuard } from './auth.guard';
import { loginGuard } from './login.guard';
import { ProductsComponent } from './components/products/products.component';
import { ProductsbygenderComponent } from './components/productsbygender/productsbygender.component';
import { ProductsbycategoryComponent } from './components/productsbycategory/productsbycategory.component';
import { ProductsByLevelComponent } from './components/products-by-level/products-by-level.component';
import { CartComponent } from './components/cart/cart.component';

export const routes: Routes = [
  {
    path: '',
    title: 'Homepage',
    component: HomePageComponent, // Default route '/'
  },
  {
    path: 'product/:id',
    title: 'Product Page',
    component: ProductPageComponent,
  },
  {
    path: 'register',
    title: 'signup form',
    component: SignupformComponent,
    canActivate: [loginGuard],
  },
  {
    path: 'login',
    title: 'login form',
    component: LoginformComponent,
    canActivate: [loginGuard],
  },
  {
    path: 'dashboard',
    title: 'dashboard form',
    component: DashboardComponent,
    canActivate: [authGuard],
    children: [
      { path: '', title: 'main dashboard', component: MainDashboardComponent },
      {
        path: 'create',
        title: 'new product',
        component: CreateProductComponent,
      },
      {
        path: 'update/:id',
        title: 'update product',
        component: UpdateProductComponent,
      },
    ],
  },
  {
    path: 'search/:label',
    title: 'search page',
    component: SearchPageComponent,
  },
  {
    path: 'products',
    title: 'All Products',
    component: SearchPageComponent, // Shows all products by default
  },
  {
    path: 'products/gender/:gender',
    title: 'Products by Gender',
    component: ProductsbygenderComponent,
  },
  {
    path: 'products/category/:category',
    title: 'Products by Category',
    component: ProductsbycategoryComponent,
  },
  {
    path: 'products/level/:level',
    title: 'Products by level',
    component: ProductsByLevelComponent,
  },
  {
    path: 'cart',
    title: 'cart',
    component: CartComponent,
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full', // Redirect unknown paths to the homepage
  },
];
