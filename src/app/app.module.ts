import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './components/app/app.component';
import {AppRoutingModule} from './routing/app-routing.module';
import {SectionService} from './client/section.service';
import {StudentService} from './client/student.service';
import {MainComponent} from './components/main/main.component';
import {DbClient} from './client/db-client';
import {NgxElectronModule} from 'ngx-electron';

import {MatTableModule} from '@angular/material/table';
import {MatButtonModule, MatDialogModule, MatPaginator, MatPaginatorModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AddUserComponent, AddUserComponentDialog} from './components/add-user/add-user.component';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    AddUserComponent,
    AddUserComponentDialog
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxElectronModule,
    MatTableModule,
    MatButtonModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    MatDialogModule
  ],
  providers: [
    SectionService,
    StudentService,
    DbClient
  ],
  bootstrap: [AppComponent],
  entryComponents: [AddUserComponentDialog]
})
export class AppModule {
}
