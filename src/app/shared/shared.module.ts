import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiAlertComponent } from './components/ui-alert/ui-alert.component';



@NgModule({
  declarations: [
    UiAlertComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    UiAlertComponent
  ]
})
export class SharedModule { }
