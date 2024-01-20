import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

declare var google: any; // will be loaded from index.html with line <script src="https://accounts.google.com/gsi/client" async defer></script>
declare var gapi: any; // will be loaded from index.html with line <script src="https://apis.google.com/js/api.js"></script>

const client_id = '290610220266-00r76ruc9a05lgqgvjks1l92tkqu54ak.apps.googleusercontent.com';

@Injectable({
  providedIn: 'root'
})
export class GoogleSigninService {

  accessTokenSubject = new BehaviorSubject<string | null>(null);
  accessToken$ = this.accessTokenSubject.asObservable();
  userProfile: any = null;

  constructor() { 
    this.initializeGoogleSignIn();
  }

  private initializeGoogleSignIn() {
    console.log('Initializing Google Sign-In...');
    const interval = setInterval(() => {
      if (typeof google !== 'undefined' && typeof gapi !== 'undefined') {
        console.log('Google library is loaded.');
        this.setupGoogleSignIn();
        clearInterval(interval);
      }
    }, 1000);
  }

  private setupGoogleSignIn() {
    try {
      console.log('Setting up Google Sign-In...');

      google.accounts.id.initialize({
        client_id: client_id,
        callback: this.handleAuthenticationResponse.bind(this),
        auto_select: false,
        cancel_on_tap_outside: true,
      });

      google.accounts.id.renderButton(
        document.getElementById("google-button"),
        { theme: "outline", size: "large", width: "100%" }
      );

      google.accounts.id.prompt((notification: any) => {
        console.log("Callback: Prompt the user to sign in",notification);        
      });

      console.log('Google Sign-In is set up.');
    } catch (error) {
      console.error('Error setting up Google Sign-In:', error);
    }
  }

  private handleAuthenticationResponse(response: any) {
    try {
      console.log('Received response from Google:', response);
      if (response.error) {
        console.error('Google Sign-In Error:', response.error);
      }
      else {        
        const idToken = response.credential;
        const payload = JSON.parse(atob(idToken.split('.')[1]));
        this.userProfile = {
          name: payload.name,
          email: payload.email
        };
        console.log("handleAuthenticationResponse: userProfile:", this.userProfile);
        this.requestAuthorizationToken();
      }
    } catch (error) {
      console.error('Error handling Google response:', error);
    }
  }

  requestAuthorizationToken() {
    const client = google.accounts.oauth2.initTokenClient({
      client_id: client_id,
      scope: 'https://www.googleapis.com/auth/spreadsheets',
      callback: (tokenResponse:any) => {
        console.log("Received Google access token:", tokenResponse);
        this.accessTokenSubject.next(tokenResponse.access_token);
      },
    });
    
    client.requestAccessToken();
  }
}