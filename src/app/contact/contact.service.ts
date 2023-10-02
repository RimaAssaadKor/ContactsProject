import { Injectable } from '@angular/core';
import { Contact } from './contact.model';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ContactService {
  public contacts = [
    {
      id: 1,
      name: 'Rima',
      email: 'rima@gmail.com',
      phone: '+96171512716',
    },
    {
      id: 2,
      name: 'Mirna',
      email: 'Mirna@gmail.com',
      phone: '+96171812716',
    },
    {
      id: 3,
      name: 'SUSU',
      email: 'susu@gmail.com',
      phone: '+96179872716',
    },
    {
      id: 4,
      name: 'Karim',
      email: 'karim@gmail.com',
      phone: '+96171590906',
    },
    {
      id: 5,
      name: 'Lea',
      email: 'lea@gmail.com',
      phone: '+96178882716',
    },
  ];
  constructor() {}
  private contactsSubject = new BehaviorSubject<Contact[]>(this.contacts);
  getContacts(): Observable<Contact[]> {
    return this.contactsSubject.asObservable();
  }

  addContact(contact: Contact): void {
    contact.id = this.contacts.length + 1;
    this.contacts.push(contact);
    this.contactsSubject.next([...this.contacts]);
  }

  updateContact(updatedContact: Contact): void {
    const index = this.contacts.findIndex((c) => c.id === updatedContact.id);
    if (index !== -1) {
      this.contacts[index] = updatedContact;
      this.contactsSubject.next([...this.contacts]);
    }
  }

  deleteContact(contact: Contact): void {
    const index = this.contacts.findIndex((c) => c.id === contact.id);
    if (index !== -1) {
      this.contacts.splice(index, 1);
      this.contactsSubject.next([...this.contacts]);
    }
  }

  searchContact(inputValue: string): Contact[] {
    inputValue = inputValue.toLowerCase();
    return this.contacts.filter((contact) => {
      return (
        contact.name.toLowerCase().includes(inputValue) ||
        contact.email.toLowerCase().includes(inputValue) ||
        contact.phone.includes(inputValue)
      );
    });
  }
}
