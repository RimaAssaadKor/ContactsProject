import { DialogRef } from '@angular/cdk/dialog';
import { Component, Input, Output, EventEmitter, Inject } from '@angular/core';
import { MatDialogRef , MAT_DIALOG_DATA  } from '@angular/material/dialog';
import { Contact } from '../../models/contact.model';
import {AngularFirestore , AngularFirestoreCollection} from '@angular/fire/compat/firestore'

// export interface DialogData {
//   id:string;
//   email: string;
//   name: string;
//   phone: string
// }


@Component({
  selector: 'app-edit-contact-dialog',
  templateUrl: './edit-contact-dialog.component.html',
  styleUrls: ['./edit-contact-dialog.component.css']
})

export class EditContactDialogComponent {
  private contactsCollection!: AngularFirestoreCollection<Contact>;
  @Input() selectedOne: any; // Input property to receive the contact data
  @Output() onSave: EventEmitter<any> = new EventEmitter<any>(); // Output event to send the updated contact data
  name!: string;
  email!: string;
  phone!: string;
  constructor(public dialogRef: MatDialogRef<EditContactDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Contact,
) {}
saveChanges() {
  console.log("this.contact" , this.selectedOne)
  const updatedContact = {
    name: this.data.name,
    email: this.data.email,
    phone: this.data.phone
  };
  console.log("this.selectedOne.id" , this.selectedOne.id)
  // this.contactsCollection.doc(this.selectedOne.id).update(updatedContact).then(()=>{
  //   console.log("done")
  // })

  // this.onSave.emit(updatedContact);

  // this.dialogRef.close();

}
}
