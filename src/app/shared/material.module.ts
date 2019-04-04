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

import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';


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
  MatProgressBarModule,
  NgZorroAntdModule
];

@NgModule({
  imports: [
    ...modules
  ],
  exports: [
    ...modules
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
})
export class MaterialModule {}
