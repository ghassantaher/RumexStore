import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackBarDemoAcknowledgementComponent } from './snack-bar-demo-acknowledgement.component';

describe('SnackBarDemoAcknowledgementComponent', () => {
  let component: SnackBarDemoAcknowledgementComponent;
  let fixture: ComponentFixture<SnackBarDemoAcknowledgementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SnackBarDemoAcknowledgementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SnackBarDemoAcknowledgementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
