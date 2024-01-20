import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { GoogleResponse } from './GoogleResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  handleGoogleSignIn(response: GoogleResponse) {
    console.log('Processing Google response...');
    console.log('Client ID:', response.clientId);
    console.log('Credential:', response.credential);
    console.log('Select by:', response.select_by);
    // Add your processing logic here

  }

  
  public accessToken: string | null = null;
  public $accessToken = new Subject<string>();

}