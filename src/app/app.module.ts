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
  MatDialogModule, MatIconModule,
  MatInputModule, MatMenuModule,
  MatPaginatorModule,
  MatTabsModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AddStudentComponent, AddUserComponentDialog} from './components/add-student/add-student.component';
import {FormsModule} from '@angular/forms';
import {AddSectionComponent, AddSectionComponentDialog} from './components/add-section/add-section.component';
import {StudentsComponent} from './components/students/students.component';
import {SectionsComponent} from './components/sections/sections.component';
import {
  EditStudentComponentDialog,
  SelectSectionsComponentDialog,
  StudentActionsComponent
} from './components/student-actions/student-actions.component';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    AddStudentComponent,
    AddUserComponentDialog,
    AddSectionComponent,
    AddSectionComponentDialog,
    StudentsComponent,
    SectionsComponent,
    StudentActionsComponent,
    SelectSectionsComponentDialog,
    EditStudentComponentDialog
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
    MatTabsModule,
    MatIconModule,
    MatMenuModule
  ],
  providers: [
    SectionService,
    StudentService,
    DbClient
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    AddUserComponentDialog,
    AddSectionComponentDialog,
    SelectSectionsComponentDialog,
    EditStudentComponentDialog
  ]
})
export class AppModule {
}
