import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { ManagerComponent } from './manager.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('ManagerComponent', () => {
  let component: ManagerComponent;
  let fixture: ComponentFixture<ManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatToolbarModule, RouterModule, RouterTestingModule],
      declarations: [ManagerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should contain a toolbar with a list of links', () => {
    let toolbar = fixture.nativeElement.querySelector('mat-toolbar');
    let buttons = toolbar.querySelectorAll('a');
    expect(buttons.length).toBeGreaterThan(0);
    expect(buttons[0].childNodes[0].nodeValue.trim()).toEqual(
      "Manager's Dashboard"
    );
    expect(buttons[1].childNodes[0].nodeValue.trim()).toEqual(
      'Products Management'
    );
    expect(buttons[2].childNodes[0].nodeValue.trim()).toEqual(
      'Orders Management'
    );
  });
});
