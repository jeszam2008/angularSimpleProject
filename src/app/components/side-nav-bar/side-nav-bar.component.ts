import { Component, OnInit, Input, TemplateRef } from '@angular/core';  
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';     

@Component({
  selector: 'app-side-nav-bar',
  templateUrl: './side-nav-bar.component.html',
  styleUrls: ['./side-nav-bar.component.css']
})
export class SideNavBarComponent implements OnInit {  
  @Input('is-open') toggleSideNavState: boolean = true;
  @Input('main-content') mainContentTemplate! : TemplateRef<string>;     
  
  constructor(private router : Router, private cookie : CookieService) {
  }

  ngOnInit(): void { 
    let cookieExist: boolean = this.cookie.check('SESSION_ID');

    if (!cookieExist) {
      this.router.navigate(['/login']);
    }
  }

  toggleSideNavbar(state: boolean): void {
    this.toggleSideNavState = state;
  }

  logout(): void {
    this.cookie.delete("SESSION_ID");
    this.router.navigate(['/login']);
  }

  checkPathURL(thisURL: string) : boolean { 
    return this.router.url === thisURL;
  }

  redirectPage(pathURL: string): void { 
    this.router.navigate([pathURL]);
  }

}
