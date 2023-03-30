import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  imports: [MatButtonModule, MatDialogModule, MatToolbarModule, MatIconModule, MatProgressBarModule, MatSidenavModule, MatExpansionModule, MatListModule, MatTooltipModule],
  exports: [MatButtonModule, MatDialogModule, MatToolbarModule, MatIconModule, MatProgressBarModule, MatSidenavModule, MatExpansionModule, MatListModule, MatTooltipModule],
})

export class AngularMaterialsModule { } 