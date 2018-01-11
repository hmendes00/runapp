import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './providers/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  private isLoggedIn: Boolean;
  private userDisplayName: String;
  private userEmail: String;

  constructor(public authService: AuthService, private router: Router) {
    this.authService.af.auth.onAuthStateChanged(
      (user) => {
        if (user == null) {
          console.log('Logged out');
          this.isLoggedIn = false;
          this.userDisplayName = '';
          this.userEmail = '';
          this.router.navigate(['login']);
        } else {
          this.isLoggedIn = true;
          this.userDisplayName = user.displayName;
          this.userEmail = user.email;
          console.log('Logged in');
          console.log(user);
          this.router.navigate(['']);
        }
      }
    );
  }
}
