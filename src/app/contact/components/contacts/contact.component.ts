import { Component , Output } from '@angular/core';
import { Contact } from '../../models/contact.model'; 
import { ContactService } from '../../services/contact.service';
import {AngularFirestore} from '@angular/fire/compat/firestore'
import { NameFilterPipe } from '../../../name-filter.pipe';
import { MatDialog } from '@angular/material/dialog';
import { EditContactDialogComponent } from '../edit-contact-dialog/edit-contact-dialog.component';
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

  contacts: Contact[] = [];
  displayedColumns: string[] = [
    'name',
    'email',
    'phone',
    'delete',
    'edit',
  ];
  constructor(private contactService: ContactService , public dialog: MatDialog , private afs  : AngularFirestore) {}
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
    if (
      this.newContact.name &&
      this.newContact.email &&
      this.newContact.phone
    ) {
      this.newContact.id = this.afs.createId()
      this.contactService.addContact(this.newContact);
      this.newContact = {id: '',name: '', email: '', phone: '' };
    }
  }
  updateContact(updatedContact: Contact): void {
    this.contactService.updateContact(updatedContact);
  }
  deleteContact(contact: Contact): void {
    this.contactService.deleteContact(contact);
  }
  editContact(contact: Contact): void {
    contact.isEditing = true;
  }
  onCellBlur(contact: Contact): void {
    contact.isEditing = false;
  }
  openDialog(contactData: any): void {
    if (contactData) {
      console.log("contactData", contactData);
      const dialogRef = this.dialog.open(EditContactDialogComponent, {
        data: {
            name: contactData.name , 
            email: contactData.email, 
            phone: contactData.phone,
        },
        width: '400px',
        height: '400px',

      });
      this.selectedOne = contactData,
      dialogRef.componentInstance.onSave.subscribe((updatedContact) => {
      });
    }
  }
}
