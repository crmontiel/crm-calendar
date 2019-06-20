import { NgModule } from '@angular/core';
import { MimiCalendarComponent } from './mimi-calendar.component';
import { CommonModule } from '@angular/common';
@NgModule({
  declarations: [MimiCalendarComponent],
  imports: [
    CommonModule
  ],
  exports: [MimiCalendarComponent]
})
export class MimiCalendarModule { }
