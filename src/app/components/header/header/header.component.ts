import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'; 
import { HttpProgressLoaderService } from 'src/app/services/http-progress-loader.service'; 

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit { 
  @Input('toggle-side-navbar') toggleSideNavbarState: boolean = false;
  @Output() changeSideNavbarState : EventEmitter<boolean> = new EventEmitter<boolean>();  
  
  constructor(public httpLoadingProgress: HttpProgressLoaderService) { }

  ngOnInit(): void { 

  }
 

  toggleSideNavbar(state: boolean): void {  
    this.changeSideNavbarState.emit(!state);
  }


}
