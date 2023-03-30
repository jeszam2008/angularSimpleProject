import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Subscription, Observable, interval, timer, of, from } from 'rxjs';
import { map, tap, switchMap, mergeMap, debounceTime, distinctUntilChanged, concatMap } from 'rxjs/operators';
import { Customer } from 'src/app/interfaces/Customer';
import { HttpReqService } from 'src/app/services/http-req.service';
import { SessionPromptComponent } from '../modals/prompt/session/session.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {
  searchKeyword: string = '';
  toggleSideNavState: boolean = true;
  httpSubscriber: Subscription = new Subscription();
  customers$: Observable<Customer[]> = new Observable<Customer[]>();

  constructor(private router: Router, private cookie: CookieService, private httpReq: HttpReqService, private dialog: MatDialog) {
    this.customers$ = this.fetchCustomers();
  }

  ngOnInit(): void {
    let cookieExist: boolean = this.cookie.check('SESSION_ID');

    // if (!cookieExist) {
    //   this.router.navigate(['/login']);
    // } 
    // for (let i = 0; i < 5; i++) {
    //   this.httpSubscriber = this.httpReq.getCustomers().pipe(
    //     map(result => result.filter(data => data.CustomerID != 'CUST_04'))
    //   ).subscribe(result => { 
    //     console.log(result);
    //   });
    // } 
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

  fetchCustomers(keyword?: string): Observable<Customer[]> {
    return timer(0, 60000).pipe(
      concatMap(() => this.httpReq.getCustomers(keyword))
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
