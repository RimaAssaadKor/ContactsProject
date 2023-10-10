import { Injectable } from '@angular/core';
import { Contact } from '../models/contact.model';
import { BehaviorSubject, Observable } from 'rxjs';
import {AngularFirestore , AngularFirestoreCollection} from '@angular/fire/compat/firestore'
import { faker } from '@faker-js/faker';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private apiUrl = 'https://myApp/contacts';
  private contactsCollection: AngularFirestoreCollection<Contact>;
  private contactsSubject = new BehaviorSubject<Contact[]>([]);

  constructor(private firestore: AngularFirestore , private functions: AngularFireFunctions , private http: HttpClient) {
    this.contactsCollection = this.firestore.collection<Contact>('contacts');
    this.contactsCollection.valueChanges().subscribe((contacts: Contact[]) => {
      this.contactsSubject.next(contacts);
    });
  }
  helloWorld(){
    const callable = this.functions.httpsCallable('helloWorld');
    return callable
  }

  createContact(contactData: any): Observable<any> {
    const callable = this.functions.httpsCallable('createContact');
    return callable(contactData);
  }
   getNewContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(`${this.apiUrl}/contacts`);
  }
  getContacts(): Observable<Contact[]> {
    return this.contactsSubject.asObservable();
  }
 
  addContact(contact: Contact): void {

    this.contactsCollection.doc(contact.id).set(contact,{merge:true})
    // add(contact);
  }

  updateContact(updatedContact: Contact): void {
     this.contactsCollection.doc(updatedContact.id).update(updatedContact)
  }

  deleteContact(contact: Contact): void {
    this.contactsCollection.doc(contact.id).delete().then(()=>{
    });
  }
generateRandomAccount(){
  const randomContact = {id:faker.string.uuid(), name: faker.internet.userName(), email: faker.internet.email(), phone: faker.phone.imei() };
  this.addContact(randomContact)
}

}
