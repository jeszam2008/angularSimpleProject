import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Customer } from 'src/app/interfaces/Customer';
import { DialogData } from 'src/app/interfaces/DialogData';
import { FormGroup, FormControl } from '@angular/forms';
import { AlertMessageComponent } from 'src/app/components/alert-message/alert-message.component';
import { CustomerService } from 'src/app/services/customer.service';
import { APIResponse } from 'src/app/interfaces/APIResponse';


@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css'],
  providers: [AlertMessageComponent]
})
export class EditCustomerComponent implements OnInit {
  customer : Customer = { "CustomerID": null, "CustomerName": null, "ContactName": null, "Address": null, "City": null, "PostalCode": null, "Country": null }; 
  @ViewChild(AlertMessageComponent) alertMessage : AlertMessageComponent = new AlertMessageComponent();

  constructor(@Inject(MAT_DIALOG_DATA) private dialogData: DialogData<any>, private dialogRef: MatDialogRef<EditCustomerComponent>, private customerService : CustomerService) { }

  ngOnInit(): void { 
    this.customer = this.dialogData.data;
  }

  updateCustomer(data : Customer) : void {
    this.alertMessage.closeAlert(false);

    if (data.CustomerID && data.CustomerName
      && data.ContactName && data.Address
      && data.City && data.PostalCode && data.Country) { 

        this.customerService.updateCustomer(data).subscribe((response : APIResponse<Customer>) => {
          
          if (response.status === '200') {
            this.closeDialog(true, true, response.data);
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
    } else {
      this.alertMessage.setAlert('alert-danger', 'Please fill-up this form completely', true, 10000, false);
    } 
  }

  closeDialog(isClose: boolean, isCompleted : boolean, data : Customer | null): void {
    this.dialogData.isClosed = isClose;
    this.dialogData.isCompleted = isCompleted;
    this.dialogData.data = data;
    this.dialogRef.close(this.dialogData);
  }
}
