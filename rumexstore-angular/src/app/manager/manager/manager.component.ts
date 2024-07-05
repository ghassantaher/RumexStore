import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss'],
})
export class ManagerComponent implements OnInit {
  public isMobile!: boolean;
  constructor() {}

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
}
