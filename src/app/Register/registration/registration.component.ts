import { Component } from '@angular/core';
import { User } from '../user';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  user: User = {
    email: '',
    password: ''
  };
  constructor(
    private auth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router
  ) {}
  goToLogin() {
    this.router.navigate(['/login']);
  }

  onSubmit() {
    this.auth.createUserWithEmailAndPassword(this.user.email, this.user.password)
      .then((credential) => {
        const uid = credential.user?.uid;
        if (uid) {
          this.firestore.collection('users').doc(uid).set(this.user)
            .then(() => {
              this.router.navigate(['/contacts']);
            })
            .catch((error) => {
              console.error('Error adding user data to Firestore:', error);
              this.router.navigate(['/error']);
            });
        }
      })
      .catch((error) => {
        console.error('Error registering user:', error);
        this.router.navigate(['/error']);
      });
  }
}
