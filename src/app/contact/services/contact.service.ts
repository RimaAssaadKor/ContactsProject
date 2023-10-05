import { Injectable } from '@angular/core';
import { Contact } from '../models/contact.model';
import { BehaviorSubject, Observable } from 'rxjs';
import {AngularFirestore , AngularFirestoreCollection} from '@angular/fire/compat/firestore'
import { faker } from '@faker-js/faker';
@Injectable({
  providedIn: 'root',
})
export class ContactService {
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

    this.contactsCollection.doc(contact.id).set(contact,{merge:true})
    // add(contact);
  }

  updateContact(updatedContact: Contact): void {
    // const index = this.contacts.findIndex((c) => c.id === updatedContact.id);
    // if (index !== -1) {
    //   this.contacts[index] = updatedContact;
    //   this.contactsSubject.next([...this.contacts]);
    // }
     this.contactsCollection.doc(updatedContact.id).update(updatedContact)
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

}
