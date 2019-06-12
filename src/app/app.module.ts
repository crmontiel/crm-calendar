import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CrmCalendarModule } from 'crm-calendar';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CrmCalendarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
