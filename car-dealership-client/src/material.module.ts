import {NgModule} from '@angular/core';

import {
  MatBadgeModule,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDialogModule,
  MatDividerModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule, MatOptionModule, MatSelectModule, MatSliderModule, MatSlideToggleModule,
  MatSnackBarModule,
  MatToolbarModule
} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatOptionModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCheckboxModule,
    MatBadgeModule,
    MatDialogModule,
    MatDividerModule,
    MatListModule,
    MatGridListModule,
    MatSnackBarModule,
    MatSliderModule,
    MatSlideToggleModule,
  ],
  exports: [
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatCheckboxModule,
    MatBadgeModule,
    MatDialogModule,
    MatDividerModule,
    MatListModule,
    MatGridListModule,
    MatSnackBarModule,
    MatSliderModule,
    MatSlideToggleModule,
  ]
})
export class MaterialModule {
}
