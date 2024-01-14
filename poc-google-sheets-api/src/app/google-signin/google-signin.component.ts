import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-google-signin',
  standalone: true,
  imports: [],
  templateUrl: './google-signin.component.html',
  styleUrl: './google-signin.component.css'
})
export class GoogleSigninComponent implements OnInit  {

  ngOnInit(): void {
    loadGoogleClient();
  } 

}

declare const gapi: any;

export const loadGoogleClient = async () => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.onload = () => {
      // gapi.load('client', {
      //   callback: () => {
      //     resolve(null);
      //   },
      //   onerror: (error: any) => {
      //     reject(error);
      //   },
      // });
    };
    script.onerror = (error: any) => {
      reject(error);
    };
    document.body.appendChild(script);
  });
};
