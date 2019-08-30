import {NgModule} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';

const modules = [
  FormsModule,
  ReactiveFormsModule,
  
  MatButtonModule,
  MatInputModule,
  MatFormFieldModule,
  MatSelectModule,
  MatOptionModule,
  MatMenuModule,
  MatDialogModule,
  NgZorroAntdModule
];

@NgModule({
  imports: [ ...modules ],
  exports: [ ...modules ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
})
export class MaterialModule {}
