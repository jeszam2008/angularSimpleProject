import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Subscription, Observable, timer, of } from 'rxjs';
import { switchMap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Product } from 'src/app/interfaces/Product';
import { ProductService } from 'src/app/services/product.service';
import { SessionPromptComponent } from '../modals/prompt/session/session.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})

export class ProductComponent implements OnInit {
  searchKeyword: string = '';
  toggleSideNavState: boolean = true;
  httpSubscriber: Subscription = new Subscription();
  products$: Observable<Product[]> = new Observable<Product[]>();

  constructor(private router: Router, private cookie: CookieService, private productService: ProductService, private dialog: MatDialog) {
    this.products$ = this.fetchProducts();
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
      this.products$ = this.fetchProducts(this.searchKeyword);
    });

  };

  fetchProducts(keyword?: string): Observable<Product[]> {
    return timer(0, 60000).pipe(
      switchMap(() => this.productService.getProducts(keyword))
    );
  }

  toggleSideNavbar(state: boolean): void {
    this.toggleSideNavState = state;
  }

  searchFilter(keyword: string): void { 
    this.products$ = of(keyword).pipe(
      debounceTime(5000),
      distinctUntilChanged(),
      switchMap((value) => this.fetchProducts(value))
    );

  }

  ngOnDestroy(): void {
    this.httpSubscriber.unsubscribe();
  }

}
