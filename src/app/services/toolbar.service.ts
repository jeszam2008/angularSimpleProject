import { Injectable } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';

@Injectable({
  providedIn: 'root'
})
export class ToolbarService { 

  constructor(private matDrawer : MatDrawer) { }

  setDrawer(thisDrawer : MatDrawer): void {
    this.matDrawer = thisDrawer;
  }

  toggleDrawer(): void {
    this.matDrawer.toggle();
  }
}
