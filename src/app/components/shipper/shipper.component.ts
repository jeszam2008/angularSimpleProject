import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Subscription, Observable, timer, of } from 'rxjs';
import { switchMap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Shipper } from 'src/app/interfaces/Shipper';
import { ShipperService } from 'src/app/services/shipper.service';
import { SessionPromptComponent } from '../modals/prompt/session/session.component';

@Component({
  selector: 'app-shipper',
  templateUrl: './shipper.component.html',
  styleUrls: ['./shipper.component.css']
})

export class ShipperComponent implements OnInit {

  searchKeyword: string = '';
  toggleSideNavState: boolean = true; 
  shippers$: Observable<Shipper[]> = new Observable<Shipper[]>();

  constructor(private router: Router, private cookie: CookieService, private shipperService: ShipperService, private dialog: MatDialog) {
    this.shippers$ = this.fetchShippers();
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
      this.shippers$ = this.fetchShippers(this.searchKeyword);
    });

  };

  fetchShippers(keyword?: string): Observable<Shipper[]> {
    return timer(0, 60000).pipe(
      switchMap(() => this.shipperService.getShippers(keyword))
    );
  }

  toggleSideNavbar(state: boolean): void {
    this.toggleSideNavState = state;
  }

  searchFilter(keyword: string): void { 
    this.shippers$ = of(keyword).pipe(
      debounceTime(5000),
      distinctUntilChanged(),
      switchMap((value) => this.fetchShippers(value))
    );

  }
 
}
