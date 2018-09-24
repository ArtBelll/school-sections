import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './components/app/app.component';
import {AppRoutingModule} from './routing/app-routing.module';
import {SectionService} from './client/section.service';
import {StudentService} from './client/student.service';
import {MainComponent} from './components/main/main.component';
import {DbClient} from './client/db-client';

import {MatTableModule} from '@angular/material/table';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTableModule
  ],
  providers: [
    SectionService,
    StudentService,
    DbClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
