import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiAlertComponent } from './components/ui-alert/ui-alert.component';
import { AboutComponent } from './components/about/about.component';



@NgModule({
  declarations: [
    UiAlertComponent,
    AboutComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    UiAlertComponent
  ]
})
export class SharedModule { }
