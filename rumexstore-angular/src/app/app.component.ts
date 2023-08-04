import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'rumexstore-angular';
  InnerWidth() {
    return window.innerWidth;
  }
  InnerHeight() {
    return window.innerHeight;
  }
  showText() {
    if (window.innerWidth > 768) {
      return true;
    } else {
      return false;
    }
  }
}
