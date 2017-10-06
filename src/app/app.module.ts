import { AngularFireDatabase } from 'angularfire2/database';
import { firebaseConfig } from './firebase-config';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { CompanyListComponent } from './company-list/company-list.component';
import { CreateCompanyComponent } from './create-company/create-company.component';
import { CompanyDetailComponent } from './company-detail/company-detail.component';
import { CompanyEditComponent } from './company-edit/company-edit.component';

import { CompanyService } from './company.service';
import { AngularFireModule } from 'angularfire2';

@NgModule({
  declarations: [
    AppComponent,
    CompanyListComponent,
    CreateCompanyComponent,
    CompanyDetailComponent,
    CompanyEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [CompanyService, AngularFireDatabase],
  bootstrap: [AppComponent]
})
export class AppModule { }
