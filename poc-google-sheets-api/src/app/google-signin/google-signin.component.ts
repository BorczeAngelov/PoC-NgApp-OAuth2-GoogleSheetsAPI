import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { HttpClient } from '@angular/common/http';

declare var google: any; // will be loaded from index.html with line <script src="https://accounts.google.com/gsi/client" async defer></script>

@Component({
  selector: 'app-google-signin',
  standalone: true,
  imports: [],
  templateUrl: './google-signin.component.html',
  styleUrl: './google-signin.component.css'
})
export class GoogleSigninComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService, private http: HttpClient) { }

  ngOnInit(): void {
    this.initializeGoogleSignIn();
  }

  // Check if 'google' is defined and initialize Google Sign-In
  initializeGoogleSignIn() {
    console.log('Initializing Google Sign-In...');
    const interval = setInterval(() => {
      if (typeof google !== 'undefined') {
        console.log('Google library is loaded.');
        this.setupGoogleSignIn();
        clearInterval(interval);
      }
    }, 1000);
  }

  setupGoogleSignIn() {
    try {
      console.log('Setting up Google Sign-In...');

      google.accounts.id.initialize({
        client_id: "290610220266-00r76ruc9a05lgqgvjks1l92tkqu54ak.apps.googleusercontent.com",
        callback: this.handleCredentialResponse.bind(this),
        auto_select: false,
        cancel_on_tap_outside: true,

      });

      google.accounts.id.renderButton(
        document.getElementById("google-button"),
        { theme: "outline", size: "large", width: "100%" }
      );

      // Prompt the user to sign in
      // @ts-ignore
      // google.accounts.id.prompt((notification: PromptMomentNotification) => {});


      console.log('Google Sign-In is set up.');
    } catch (error) {
      console.error('Error setting up Google Sign-In:', error);
    }

  }

  async handleCredentialResponse(response: any) {
    try {
      console.log('Received response from Google:', response);
      if (response.error) {
        console.error('Google Sign-In Error:', response.error);
      }
      else {
        this.authenticationService.handleGoogleSignIn(response);

      }
    } catch (error) {
      console.error('Error handling Google response:', error);
    }

  }
}
