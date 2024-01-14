import { Component, OnInit } from '@angular/core';

declare var google: any;

@Component({
  selector: 'app-google-signin',
  standalone: true,
  imports: [],
  templateUrl: './google-signin.component.html',
  styleUrl: './google-signin.component.css'
})
export class GoogleSigninComponent implements OnInit {

  ngOnInit(): void {
    console.log('Initializing Google Sign-in Component...');
    this.loadGoogleLibrary();
  }

  async loadGoogleLibrary() {
    console.log('Loading Google Library...');
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.onload = () => {
        if (typeof google !== 'undefined') {
          console.log('Google library loaded successfully.');
          this.initializeGoogleOAuthClient();
        }
        else {
          console.error('Failed to load Google library.');
        }
      };
      script.onerror = (error: any) => {
        console.error('Error occurred while loading Google library:', error);
        reject(error);
      };
      document.body.appendChild(script);
    });
  }

  initializeGoogleOAuthClient() {
    console.log('Initializing Google OAuth client...');
    return google.accounts.oauth2.initTokenClient({
      client_id: '290610220266-00r76ruc9a05lgqgvjks1l92tkqu54ak.apps.googleusercontent.com',
      scope: 'https://www.googleapis.com/auth/spreadsheets.readonly',
      callback: (response:any) => {
        console.log('Received callback from Google Sheets scope:', response);
        // handle the response
      },
    });
  }
}
