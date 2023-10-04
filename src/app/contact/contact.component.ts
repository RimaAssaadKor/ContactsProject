import { Component } from '@angular/core';
import { Contact } from './contact.model';
import { ContactService } from './contact.service';
import {AngularFirestore} from '@angular/fire/compat/firestore'
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  newContact: Contact = {
    id: '',
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
  constructor(private contactService: ContactService) {}
  searchQuery: string = '';
  ngOnInit(): void {
    this.contactService.getContacts().subscribe((contacts) => {
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
      this.newContact = { name: '', email: '', phone: '' };
      this.contactService.addContact(this.newContact);
      this.newContact = { id: '', name: '', email: '', phone: '' };
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
  searchContact(query: string): void {
    // if (query) {
    //   this.contacts = this.contactService.searchContact(query);
    // } else {
    //   this.contactService.getContacts().subscribe((contacts) => {
    //     this.contacts = contacts;
    //   });
    // }
  }
}
