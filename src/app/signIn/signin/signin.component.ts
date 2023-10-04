import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  email: string = '';
  pass: string = '';

  constructor(private auth: AngularFireAuth, private router: Router) {}

  onLogin() {
    this.auth.signInWithEmailAndPassword(this.email, this.pass)
      .then(() => {
        // Redirect to the contact list or another page on successful login
        this.router.navigate(['/contacts']);
      })
      .catch((error) => {
        this.router.navigate(['/error']);
      });
  }
}
