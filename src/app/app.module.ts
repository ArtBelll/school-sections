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
import {
  MatButtonModule,
  MatCheckboxModule,
  MatDialogModule,
  MatInputModule,
  MatPaginator,
  MatPaginatorModule,
  MatTabsModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AddUserComponent, AddUserComponentDialog} from './components/add-user/add-user.component';
import {FormsModule} from '@angular/forms';
import {AddSectionComponent, AddSectionComponentDialog} from './components/add-section/add-section.component';
import { StudentsComponent } from './components/students/students.component';
import { SectionsComponent } from './components/sections/sections.component';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    AddUserComponent,
    AddUserComponentDialog,
    AddSectionComponent,
    AddSectionComponentDialog,
    StudentsComponent,
    SectionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxElectronModule,
    MatTableModule,
    MatButtonModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatInputModule,
    FormsModule,
    MatCheckboxModule,
    MatTabsModule
  ],
  providers: [
    SectionService,
    StudentService,
    DbClient
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    AddUserComponentDialog,
    AddSectionComponentDialog
  ]
})
export class AppModule {
}
