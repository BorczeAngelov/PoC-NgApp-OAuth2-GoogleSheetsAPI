import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleSheetsDemoComponent } from './google-sheets-demo.component';

describe('GoogleSheetsDemoComponent', () => {
  let component: GoogleSheetsDemoComponent;
  let fixture: ComponentFixture<GoogleSheetsDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoogleSheetsDemoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GoogleSheetsDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
