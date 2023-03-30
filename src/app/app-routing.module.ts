import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; 
import { MainComponent } from './components/main/main.component';  
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {path: '', redirectTo: '/customer', pathMatch: 'full'},
  {path: 'main', component: MainComponent},
  {path: 'login', component: LoginComponent},
  {path: 'customer', loadChildren: () => import('./modules/customer/customer.module').then(m => m.CustomerModule)},
  {path: 'product', loadChildren: () => import('./modules/product/product.module').then(m => m.ProductModule)},
  {path: 'shipper', loadChildren: () => import('./modules/shipper/shipper.module').then(m => m.ShipperModule)},
  {path: 'supplier', loadChildren: () => import('./modules/supplier/supplier.module').then(m => m.SupplierModule)},
  { path: '**', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
