import { NgModule } from '@angular/core';
import { MatNativeDateModule, MatRippleModule } from '@angular/material';

import {
  MatSliderModule,
  MatDatepickerModule,
  MatTabsModule,
  MatStepperModule,
  MatSnackBarModule,
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule
} from '@angular/material';

@NgModule({
  imports: [
    MatSliderModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatTabsModule,
    MatStepperModule,
    MatSnackBarModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule
  ],
  exports: [
    MatSliderModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatTabsModule,
    MatStepperModule,
    MatSnackBarModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
  ]
})
export class MaterialModule { }