import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Subscription, Observable, timer, of } from 'rxjs';
import { switchMap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Customer } from 'src/app/interfaces/Customer';
import { CustomerService } from 'src/app/services/customer.service'; 
import { AlertMessageComponent } from '../alert-message/alert-message.component';
import { AddCustomerComponent } from './modal/add-customer/add-customer.component';
import { SessionPromptComponent } from '../modals/prompt/session/session.component';
import { EditCustomerComponent } from './modal/edit-customer/edit-customer.component';
import { APIResponse } from 'src/app/interfaces/APIResponse';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})


export class CustomerComponent implements OnInit {
  searchKeyword: string = '';
  toggleSideNavState: boolean = true;
  httpSubscriber: Subscription = new Subscription();
  customers$: Observable<Customer[]> = new Observable<Customer[]>();
  @ViewChild(AlertMessageComponent) alertMessage : AlertMessageComponent = new AlertMessageComponent();

  constructor(private router: Router, private cookie: CookieService, private customerService: CustomerService, private dialog: MatDialog) {
    this.customers$ = this.fetchCustomers();
  }

  ngOnInit(): void {
    let cookieExist: boolean = this.cookie.check('SESSION_ID');

    if (!cookieExist) {
      this.router.navigate(['/login']);
    } 
     
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(SessionPromptComponent, {
      'data': { isClosed: false, data: [] },
      'disableClose': true,
      'height': '200px',
      'width': '300px',
      'autoFocus': true,
      'panelClass': 'session-prompt'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.customers$ = this.fetchCustomers(this.searchKeyword);
    });

  };

  addCustomer(): void {
    const dialogRef = this.dialog.open(AddCustomerComponent, {
      'data': { isClosed: false, data: [] },
      'disableClose': true, 
      'maxWidth': '90%',
      'minWidth': '40%', 
      'autoFocus': true,
      'panelClass': 'add-customer-modal'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result.isClosed && result.isCompleted) {
        let newCustomer : Customer = result.data;
        this.customers$ = this.fetchCustomers(this.searchKeyword);
        this.alertMessage.setAlert('alert-success', 'Customer <b>' + newCustomer.CustomerID + ' (' + newCustomer . CustomerName + ') ' + '</b> has been successfully added.', true, 10000, false);
      }
       
    });

  };

  updateCustomer(customer : Customer) : void {
    const dialogRef = this.dialog.open(EditCustomerComponent, {
      'data': { isClosed: false, data: customer },
      'disableClose': true, 
      'maxWidth': '90%',
      'minWidth': '40%', 
      'autoFocus': true,
      'panelClass': 'add-customer-modal'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result.isClosed && result.isCompleted) {
        let updatedCustomer : Customer = result.data;
        this.customers$ = this.fetchCustomers(this.searchKeyword);
        this.alertMessage.setAlert('alert-success', 'Customer <b>' + updatedCustomer.CustomerID + ' (' + updatedCustomer.CustomerName + ') ' + '</b> has been successfully updated.', true, 10000, false);
      }
       
    });
  }

  deleteCustomer(customerID : string, customerName : string) : void {
    if (confirm('Are you sure you want to remove this Customer ' + customerID + ' (' + customerName + ') ' + '?')) {
      this.customerService.removeCustomer(customerID).subscribe((response : APIResponse<Customer>) => {
          
        if (response.status === '200') {
          this.customers$ = this.fetchCustomers(this.searchKeyword);
          this.alertMessage.setAlert('alert-success', 'Customer <b>' + customerID + ' (' + customerName + ') ' + '</b> has been successfully removed.', true, 10000, false);
        } else if (response.status === '300') {
          this.alertMessage.setAlert('alert-danger', '<b>Unable to process</b>: Invalid parameters.', true, 0, false);
        } else if (response.status === '400') {
          this.alertMessage.setAlert('alert-danger', '<b>Unable to process</b>: Customer does not exist.', true, 0, false);
        } else if (response.status === '500') {
          this.alertMessage.setAlert('alert-danger', '<b>Unable to process</b>: Server error.', true, 0, false);
        }
      }, (error) => {
        this.alertMessage.setAlert('alert-danger', 'Something went wrong in server. Please contact to the administrator', true, 0, false);
      });
    }
  }

  fetchCustomers(keyword?: string): Observable<Customer[]> {
    return timer(0, 60000).pipe(
      switchMap(() => this.customerService.getCustomers(keyword))
    );
  }

  toggleSideNavbar(state: boolean): void {
    this.toggleSideNavState = state;
  }

  searchFilter(keyword: string): void { 
    this.customers$ = of(keyword).pipe(
      debounceTime(5000),
      distinctUntilChanged(),
      switchMap((value) => this.fetchCustomers(value))
    );

  }

  ngOnDestroy(): void {
    this.httpSubscriber.unsubscribe();
  }

}
