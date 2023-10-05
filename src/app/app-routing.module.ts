import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './Register/registration/registration.component';
import { ContactComponent } from './contact/components/contacts/contact.component';
import { ErrorPageComponent } from './errorPage/error-page/error-page.component';
import { SigninComponent } from './signIn/signin/signin.component';

const routes: Routes = [
  { path: '', redirectTo: 'register', pathMatch: 'full' }, // Redirect to register
  { path: 'register', loadChildren: () => import('./Register/registration/register.module').then(m => m.RegisterModule) },
  { path: 'contacts', loadChildren: () => import('./contact/components/contacts/contacts.module').then(m => m.ContactsModule) },
  { path: 'error', component: ErrorPageComponent },
  { path: 'login', loadChildren: () => import('./signIn/signin/signin.module').then(m => m.SigninModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
