import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactComponent } from './contact/components/contacts/contact.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideRemoteConfig,getRemoteConfig } from '@angular/fire/remote-config';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { AngularFireModule } from '@angular/fire/compat'
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { NameFilterPipe } from './name-filter.pipe';
import { MatDialogModule } from '@angular/material/dialog';
// import { EditContactDialogComponent } from './edit-contact-dialog/edit-contact-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditContactDialogComponent } from './contact/components/edit-contact-dialog/edit-contact-dialog.component';
import { RegistrationComponent } from './Register/registration/registration.component';
import { ErrorPageComponent } from './errorPage/error-page/error-page.component';
import { SigninComponent } from './signIn/signin/signin.component';
@NgModule({
  declarations: [
    AppComponent,
    ContactComponent,
    NameFilterPipe,
    EditContactDialogComponent,
    RegistrationComponent,
    ErrorPageComponent,
    SigninComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    FormsModule, BrowserAnimationsModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    MatDialogModule,
    ReactiveFormsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
