import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; 
import { CommonModule } from '@angular/common';
import { SupplierComponent } from 'src/app/components/supplier/supplier.component';

const routes: Routes = [
  {path: '', component: SupplierComponent}, 
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})

export class SupplierModule { }
