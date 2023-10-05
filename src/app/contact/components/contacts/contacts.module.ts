import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './contact.component'; 
import { TranslocoModule, TRANSLOCO_CONFIG } from '@ngneat/transloco';

const routes: Routes = [
  { path: '', component: ContactComponent },
];
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TranslocoModule
  ]
})
export class ContactsModule { }
