import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; 
import { CommonModule } from '@angular/common';
import { ShipperComponent } from 'src/app/components/shipper/shipper.component';

const routes: Routes = [
  {path: '', component: ShipperComponent}, 
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ShipperModule { }
