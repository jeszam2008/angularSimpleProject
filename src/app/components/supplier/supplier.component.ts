import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Subscription, Observable, timer, of } from 'rxjs';
import { switchMap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Supplier } from 'src/app/interfaces/Supplier';
import { SupplierService } from 'src/app/services/supplier.service';
import { SessionPromptComponent } from '../modals/prompt/session/session.component';


@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})

export class SupplierComponent implements OnInit {
  searchKeyword: string = '';
  toggleSideNavState: boolean = true; 
  suppliers$: Observable<Supplier[]> = new Observable<Supplier[]>();

  constructor(private router: Router, private cookie: CookieService, private supplierService: SupplierService, private dialog: MatDialog) {
    this.suppliers$ = this.fetchSuppliers();
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
      this.suppliers$ = this.fetchSuppliers(this.searchKeyword);
    });

  };

  fetchSuppliers(keyword?: string): Observable<Supplier[]> {
    return timer(0, 60000).pipe(
      switchMap(() => this.supplierService.getSuppliers(keyword))
    );
  }

  toggleSideNavbar(state: boolean): void {
    this.toggleSideNavState = state;
  }

  searchFilter(keyword: string): void { 
    this.suppliers$ = of(keyword).pipe(
      debounceTime(5000),
      distinctUntilChanged(),
      switchMap((value) => this.fetchSuppliers(value))
    );

  }
}
