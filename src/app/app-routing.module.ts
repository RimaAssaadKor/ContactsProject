import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './Register/registration/registration.component';
import { ContactComponent } from './contact/components/contacts/contact.component';
import { ErrorPageComponent } from './errorPage/error-page/error-page.component';
import { SigninComponent } from './signIn/signin/signin.component';

const routes: Routes = [
  { path: '', component: RegistrationComponent },
  { path: 'contacts', component: ContactComponent },
  { path: 'error', component: ErrorPageComponent },
  { path: 'login', component: SigninComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
