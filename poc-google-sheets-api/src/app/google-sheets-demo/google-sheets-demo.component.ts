import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { GoogleSigninService } from '../google-signin/google-signin.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-google-sheets-demo',
  standalone: true,
  imports: [HttpClientModule, FormsModule, CommonModule],
  templateUrl: './google-sheets-demo.component.html',
  styleUrl: './google-sheets-demo.component.css'
})
export class GoogleSheetsDemoComponent implements OnInit {
  spreadsheetId = '1g487--YD3zzspcEaD72Qs82OGghxyPkahyGgu2in8Ko'; // replace with your Spreadsheet ID
  range = 'Sheet1'; // replace with your Sheet name

  messages: string[] = [];
  newMessage = '';
  jsonContent: any;

  constructor(private http: HttpClient, public googleSigninService: GoogleSigninService) { }

  ngOnInit(): void {
    this.googleSigninService.accessToken$.subscribe(token => {
      console.log("GoogleSheetsDemoComponent: Processing token");

      if (token) {
        this.readDataWithToken(token);
      }
    });
  }

  loadMessages() {
    const token = this.googleSigninService.accessTokenSubject.getValue();
    if (token) {
      this.readDataWithToken(token);
    } else {
      this.googleSigninService.requestAuthorizationToken();
    }
  }

  sendMessage() {
    const token = this.googleSigninService.accessTokenSubject.getValue();
    if (token) {
      const message = this.googleSigninService.userProfile
        ? this.formatMessage(this.newMessage)
        : this.newMessage;
      this.appendDataWithToken(token, [[message]]);
      this.newMessage = '';
    } else {
      this.googleSigninService.requestAuthorizationToken();
    }
  }

  private formatMessage(message: string) {
    const name = this.googleSigninService.userProfile.name;
    const timestamp = new Date().toISOString();
    return `${name} (${timestamp}): ${message}`;
  }

  private readDataWithToken(token: string) {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${this.spreadsheetId}/values/${this.range}`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.get(url, { headers }).subscribe((data: any) => {
      console.log('Read data:', data);
      this.jsonContent = JSON.stringify(data, null, 2);
      this.messages = data.values.map((row: any[]) => row[0]);
    });
  }

  private appendDataWithToken(token: string, data: any[]) {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${this.spreadsheetId}/values/${this.range}:append?valueInputOption=USER_ENTERED`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.post(url, { values: data }, { headers }).subscribe(response => {
      console.log('Append data:', response);
      this.loadMessages();
    });
  }
}