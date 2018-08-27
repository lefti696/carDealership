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
  MatMenuModule, MatOptionModule, MatPaginatorModule, MatSelectModule, MatSliderModule, MatSlideToggleModule,
  MatSnackBarModule, MatTableModule,
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
    MatTableModule,
    MatPaginatorModule,
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
    MatTableModule,
    MatPaginatorModule,
  ]
})
export class MaterialModule {
}
