import { NgModule } from '@angular/core';
import { CrmCalendarComponent } from './crm-calendar.component';
import { CommonModule } from '@angular/common';
@NgModule({
  declarations: [CrmCalendarComponent],
  imports: [
    CommonModule
  ],
  exports: [CrmCalendarComponent]
})
export class CrmCalendarModule { }
