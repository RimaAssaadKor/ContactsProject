import { Injectable } from '@angular/core';
import { Contact } from './contact.model';
import { BehaviorSubject, Observable } from 'rxjs';
import {AngularFirestore , AngularFirestoreCollection} from '@angular/fire/compat/firestore'
import { faker } from '@faker-js/faker';
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
  private contactsCollection: AngularFirestoreCollection<Contact>;
  private contactsSubject = new BehaviorSubject<Contact[]>([]);

  constructor(private firestore: AngularFirestore) {
    this.contactsCollection = this.firestore.collection<Contact>('contacts');
    this.contactsCollection.valueChanges().subscribe((contacts: Contact[]) => {
      this.contactsSubject.next(contacts);
    });
  }

  getContacts(): Observable<Contact[]> {
    return this.contactsSubject.asObservable();
  }

  addContact(contact: Contact): void {
    this.contactsCollection.add(contact);
  }

  updateContact(updatedContact: Contact): void {
    // const index = this.contacts.findIndex((c) => c.id === updatedContact.id);
    // if (index !== -1) {
    //   this.contacts[index] = updatedContact;
    //   this.contactsSubject.next([...this.contacts]);
    // }
  }

  deleteContact(contact: Contact): void {
    this.contactsCollection.doc(contact.id).delete().then(()=>{
      console.log("deleted")
    });
   
  }
generateRandomAccount(){
  const randomContact = {id:faker.string.uuid(), name: faker.internet.userName(), email: faker.internet.email(), phone: faker.phone.imei() };
  this.addContact(randomContact)
}
  searchContact(inputValue: string){
  //   inputValue = inputValue.toLowerCase();
  //   return this.contacts.filter((contact) => {
  //     return (
  //       contact.name.toLowerCase().includes(inputValue) ||
  //       contact.email.toLowerCase().includes(inputValue) ||
  //       contact.phone.includes(inputValue)
  //     );
  //   });
   }
}
