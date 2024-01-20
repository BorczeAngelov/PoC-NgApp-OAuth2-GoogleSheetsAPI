import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { GoogleSigninService } from '../google-signin/google-signin.service';

@Component({
  selector: 'app-google-sheets-demo',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './google-sheets-demo.component.html',
  styleUrl: './google-sheets-demo.component.css'
})
export class GoogleSheetsDemoComponent implements OnInit {
  content = '';

  constructor(private http: HttpClient, private googleSigninService: GoogleSigninService) { }

  ngOnInit(): void {
  }
}