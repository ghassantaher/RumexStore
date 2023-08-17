import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor() {}
  title = 'rumexstore-angular';
  public isMobile!: boolean;
  ngOnInit() {
    if (window.innerWidth > 576) {
      this.isMobile = false;
    } else {
      this.isMobile = true;
    }
  }
  onResize(event: any) {
    if (event.target.innerWidth > 576) {
      this.isMobile = false;
    } else {
      this.isMobile = true;
    }
  }
  showText() {
    if (window.innerWidth > 768) {
      return true;
    } else {
      return false;
    }
  }
  isLessThan(width:number):boolean
  {
    if (window.innerWidth < width) {
      return true;
    } else {
      return false;
    }
  }
}
