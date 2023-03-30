import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'alert-message',
  template: ` 
    <div class="alert alert-dismissible" [ngClass]="alertType" time-out="timeOutDuration" *ngIf="alertMesage">
      <span [innerHtml]="alertMesage"></span> 
      <button class="btn-close small" *ngIf="hasCloseBtn" (click)="closeAlert(hasAnimation)"></button>
    </div> 
  `
})

export class AlertMessageComponent implements OnInit {
  @Input("type") alertType?: string = undefined;
  @Input("message") alertMesage?: string = undefined;
  @Input("is-close") hasCloseBtn: boolean = false;
  @Input("time-out") timeOutDuration: number = 0;
  @Input("has-animation") hasAnimation: boolean = false;

  private timeout?: ReturnType<typeof setTimeout>;

  constructor() { }

  ngOnInit(): void {
    if (this.alertType && this.alertMesage) {
      this.setAlert(this.alertType, this.alertMesage, this.hasCloseBtn, this.timeOutDuration, this.hasAnimation);
    }
  }

  setAlert(type: string, message: string, hasCloseBtn: boolean, timeOutDuration: number, hasAnimation: boolean): void {
    this.closeAlert(hasAnimation);

    if (timeOutDuration) {
      this.timeout = setTimeout(() => {
        this.closeAlert(hasAnimation);
      }, timeOutDuration);
    }

    this.alertType = type;
    this.alertMesage = message;
    this.hasCloseBtn = hasCloseBtn;
    this.hasAnimation = hasAnimation;
  }

  closeAlert(hasAnimation: boolean): void {
    clearTimeout(this.timeout);
    this.alertType = undefined;
    this.alertMesage = undefined;
    this.hasCloseBtn = false;
    this.hasAnimation = false;
  }



}
