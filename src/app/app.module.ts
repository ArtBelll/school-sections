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
import {AddStudentComponent} from './components/add-student/add-student.component';
import {FormsModule} from '@angular/forms';
import {AddSectionComponent} from './components/add-section/add-section.component';
import {StudentsComponent} from './components/students/students.component';
import {SectionsComponent} from './components/sections/sections.component';
import {
  StudentActionsComponent
} from './components/student-actions/student-actions.component';
import { StudentDialogComponent } from './dialogs/student-dialog/student-dialog.component';
import { SectionDialogComponent } from './dialogs/section-dialog/section-dialog.component';
import { SelectSectionsDialogComponent } from './dialogs/select-sections-dialog/select-sections-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    AddStudentComponent,
    AddSectionComponent,
    StudentsComponent,
    SectionsComponent,
    StudentActionsComponent,
    StudentDialogComponent,
    SectionDialogComponent,
    SelectSectionsDialogComponent,
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
    StudentDialogComponent,
    SectionDialogComponent,
    SelectSectionsDialogComponent
  ]
})
export class AppModule {
}
