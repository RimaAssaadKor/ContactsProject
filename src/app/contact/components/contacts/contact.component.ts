import { Component , Output } from '@angular/core';
import { Contact } from '../../models/contact.model'; 
import { ContactService } from '../../services/contact.service';
import {AngularFirestore} from '@angular/fire/compat/firestore'
import { NameFilterPipe } from '../../../name-filter.pipe';
import { MatDialog } from '@angular/material/dialog';
import { EditContactDialogComponent } from '../edit-contact-dialog/edit-contact-dialog.component';
import { FormGroup, FormControl } from '@angular/forms';
import { PdfExportService } from 'src/app/pdf-export.service';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  @Output() selectedOne : any
  newContact: Contact = {
    id:'',
    name: '',
    email: '',
    phone: '',
  };
  contactForm  = new FormGroup({
    id: new FormControl(''),
    name: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''), 
    address :new FormControl(''), });
  contacts: Contact[] = [];
  displayedColumns: string[] = [
    'name',
    'email',
    'phone',
    'address',
    'delete',
    'edit',
  ];
  constructor(private contactService: ContactService , public dialog: MatDialog , private afs  : AngularFirestore , private exportService :  PdfExportService ) {}
  searchQuery: string = '';
  ngOnInit(): void {
    this.contactService.getContacts().subscribe((contacts: Contact[]) => {
      this.contacts = contacts;
    });
  }
  generateRandomAccount(){
    this.contactService.generateRandomAccount()
  }
  addContact(): void {
    if (this.contactForm.valid) {
      const newContactData: Contact = {
        id: this.afs.createId(),
        name: this.contactForm.get('name')?.value || '',   // Use the safe navigation operator and provide a default value
        email: this.contactForm.get('email')?.value || '', // Use the safe navigation operator and provide a default value
        phone: this.contactForm.get('phone')?.value || '', // Use the safe navigation operator and provide a default value
        address: this.contactForm.get('address')?.value || ''
      };

      this.contactService.addContact(newContactData);
      this.contactForm.reset();
    }
  }
  
  updateContact(updatedContact: Contact): void {
    this.contactService.updateContact(updatedContact);
  }
  deleteContact(contact: Contact): void {
    this.contactService.deleteContact(contact);
  }

  export(){
    this.exportService.export(this.contacts)
  }
  openDialog(contactData: any): void {
    if (contactData) {
      console.log("contactData", contactData);
      const dialogRef = this.dialog.open(EditContactDialogComponent, {
        data: {
            id:contactData.id,
            name: contactData.name , 
            email: contactData.email, 
            phone: contactData.phone,
        },
        width: '400px',
        height: '400px',

      });
      this.selectedOne = contactData,
      console.log(contactData)
      dialogRef.componentInstance.onSave.subscribe((updatedContact) => {
      });
    }
  }
}