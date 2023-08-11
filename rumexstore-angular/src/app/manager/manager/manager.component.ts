import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss'],
})
export class ManagerComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
  showText() {
    if (window.innerWidth > 768) {
      return true;
    } else {
      return false;
    }
  }
}
