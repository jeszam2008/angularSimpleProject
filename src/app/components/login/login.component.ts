import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';  
import { CookieService } from 'ngx-cookie-service';  
import { AlertMessageComponent } from '../alert-message/alert-message.component';
import { DatePipe } from '@angular/common'; 
import * as crypto from 'crypto-js'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AlertMessageComponent, DatePipe] 
})

export class LoginComponent implements OnInit, AfterViewInit { 
  login : { "Username" : string | null, "Password": string | null } = {"Username": null, "Password": null};
  @ViewChild(AlertMessageComponent) alertMessage : AlertMessageComponent = new AlertMessageComponent();

  constructor(private router : Router, private cookie : CookieService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    let cookieExist: boolean = this.cookie.check('SESSION_ID');

    if (cookieExist) {
      this.router.navigate(['/customer']);
    }  
  
  }
 
  ngAfterViewInit(): void {    
    setTimeout(() => {
      // this.alertMessage.setAlert('alert-success', 'Hello World', true, 0, false);
    });
  }
 
  promptAlert(alertType: string, alertMesage: string, hasCloseBtn: boolean, timeoutDuration: number, hasAnimation: boolean): void {
    this.alertMessage.setAlert(alertType, alertMesage, hasCloseBtn, timeoutDuration, hasAnimation);
  }

  loginSubmit(username: string | null, password: string | null) : void { 
    if (username && password) {
      this.cookie.set("SESSION_ID", this.generateSession(username, password));
      this.router.navigate(['/customer']);  
    } else { 
      this.alertMessage.setAlert('alert-warning', 'Please provide your credentials', true, 10000, false);
    }
    
  }

  generateSession(username : string, password : string) : string {
    let currentDate = new Date();
    let filteredDate = this.datePipe.transform(currentDate, 'yyyyMMddhhmmss');
    console.log(filteredDate);
    return crypto.SHA1(username + password + filteredDate).toString();
  }
 

}
