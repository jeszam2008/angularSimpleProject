import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module'; 
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AngularMaterialsModule } from './modules/angular-materials/angular-materials.module';
import { FormsModule } from '@angular/forms'; 
import { ReactiveFormsModule } from '@angular/forms'; 
import { CustomerModule } from './modules/customer/customer.module';

import { CookieService } from 'ngx-cookie-service';
import { HttpReqService } from './services/http-req.service';
import { ToolbarService } from './services/toolbar.service';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { AlertMessageComponent } from './components/alert-message/alert-message.component';
import { MainComponent } from './components/main/main.component'; 
import { SessionPromptComponent } from './components/modals/prompt/session/session.component';  

import { AppInterceptor } from './app.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header/header.component';
import { SideNavBarComponent } from './components/side-nav-bar/side-nav-bar.component';
import { CustomerComponent } from './components/customer/customer.component';
import { ProductComponent } from './components/product/product.component';
import { ShipperComponent } from './components/shipper/shipper.component';
import { SupplierComponent } from './components/supplier/supplier.component';
import { AddCustomerComponent } from './components/customer/modal/add-customer/add-customer.component';
import { EditCustomerComponent } from './components/customer/modal/edit-customer/edit-customer.component';   


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AlertMessageComponent,
    MainComponent,
    SessionPromptComponent,
    HeaderComponent,
    SideNavBarComponent,
    CustomerComponent,
    ProductComponent,
    ShipperComponent,
    SupplierComponent,
    AddCustomerComponent,
    EditCustomerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AngularMaterialsModule,
    FormsModule,
    ReactiveFormsModule,
    CustomerModule
  ],
  entryComponents: [SessionPromptComponent],
  providers: [CookieService, HttpReqService, ToolbarService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AppInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
