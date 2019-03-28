import {NgModule} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatCardModule,
  MatButtonModule,
  MatInputModule,
  MatIconModule,
  MatFormFieldModule,
  MatSelectModule,
  MatOptionModule,
  MatCheckboxModule,
  MatToolbarModule,
  MatMenuModule,
  MatSidenavModule,
  MatListModule,
  MatTabsModule,
  MatDialogModule,
  MatProgressSpinnerModule,
  MatTooltipModule,
  MatSlideToggleModule,
  MatDividerModule,
  MatProgressBarModule,
  MatLineModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSnackBarModule
} from '@angular/material';


const modules = [
  FormsModule,
  ReactiveFormsModule,
  
  MatButtonModule,
  MatInputModule,
  MatFormFieldModule,
  MatSelectModule,
  MatOptionModule,
  MatCheckboxModule,
  MatMenuModule,
  MatDialogModule,
  MatDividerModule,
  MatProgressBarModule
];

@NgModule({
  imports: [
    ...modules
  ],
  exports: [
    ...modules
  ],
  providers: []
})
export class MaterialModule {}
