import { Component } from '@angular/core';
import { ViewportScroller } from '@angular/common';
@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss'],
})
export class PrivacyPolicyComponent {
  constructor(private viewportScroller: ViewportScroller) {}
  public navigateToSection(section: string) {
    window.location.hash = '';
    window.location.hash = section;
  }
  public onClick(elementId: string): void {
    this.viewportScroller.scrollToAnchor(elementId);
  }
}
